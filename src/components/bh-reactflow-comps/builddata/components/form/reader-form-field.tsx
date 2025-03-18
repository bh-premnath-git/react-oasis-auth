import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

import sourceSchema from "../../json/Source.json";
import csvOptionsSchema from "../../json/CSVOptions.json";
import readerSchema from "../../json/Reader.json";

export const schemaReferences: Record<string, typeof sourceSchema | typeof csvOptionsSchema | typeof readerSchema> = {
    "schemas/Source.json": sourceSchema,
    "transformations/readers/CSVOptions.json": csvOptionsSchema,
    "schemas/Reader.json": readerSchema,
};

const formatFieldName = (fieldName: string) => {
    return fieldName
        .replace(/([A-Z])/g, " $1")
        .replace(/^ /, "")
        .split("_")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};

const isFieldRequired = (
    fieldName: string,
    schema: any,
    path: string[],
    currentFormData: FormData
) => {
    if (Array.isArray(readerSchema.required) && readerSchema.required.includes(fieldName)) {
        return true;
    }

    if (Array.isArray(schema.required) && schema.required.includes(fieldName)) {
        return true;
    }

    if (path[0] === 'source') {
        const sourceType = currentFormData.source?.type;
        if (sourceType) {
            const sourceCondition = sourceSchema.allOf?.find(
                condition => condition.if.properties.type.const === sourceType
            );

            if (sourceCondition?.then?.required?.includes(fieldName)) {
                return true;
            }
        }

        if (sourceSchema.required?.includes(fieldName)) {
            return true;
        }
    }

  

    return false;
};

const RequiredFieldLabel: React.FC<{ fieldName: string }> = ({ fieldName }) => (
    <div className="flex items-center gap-1">
        {formatFieldName(fieldName)}
        <span className="text-red-500">*</span>
    </div>
);


export interface FormData {
    name?: string;
    source?: {
        type?: string;
        connection?: {
            connection_config_id?: number;
            [key: string]: any;
        };
        [key: string]: any;
    };
    file_type?: string;
    query?: string;
    read_options?: Record<string, any>;
    [key: string]: any;
}

export const ReaderFormField: React.FC<{
    fieldName: string;
    fieldSchema: any;
    path: string[];
    formData: FormData;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, path: string[]) => void;
    errors: Record<string, string>;
    connectionConfigList?: any[];
    selectedConnection?: any;
    disabled?: boolean;
    disableList?: string[];
}> = ({ fieldName, fieldSchema, path, formData, onChange, errors, connectionConfigList, selectedConnection, disabled, disableList=['connection','source_name','file_type'] }) => {
    if (!fieldSchema) return null;

    const isFieldDisabled = disabled || (disableList && disableList.includes(fieldName));

    if (fieldSchema.$ref) {
        const referencedSchema = schemaReferences[fieldSchema.$ref];
        if (referencedSchema && referencedSchema.properties) {
            return (
                <div key={fieldName} className="col-span-3 border p-4 ">
                    <div className="grid grid-cols-2 gap-2">
                        {Object.entries(referencedSchema.properties).map(
                            ([name, schema]: [string, any]) =>
                                ReaderFormField({ fieldName: name, fieldSchema: schema, path: [...path, fieldName], formData, onChange, errors, connectionConfigList, selectedConnection, disabled, disableList })
                        )}
                    </div>
                </div>
            );
        }
    }

    const fieldValue = path.reduce(
        (obj, key) => (obj?.[key] || {}),
        formData
    )[fieldName];

    if (fieldSchema.enum) {
        return (
            <div key={fieldName} className="mb-4">
                <Label>
                    {isFieldRequired(fieldName, fieldSchema, path, formData) ? (
                        <RequiredFieldLabel fieldName={fieldSchema.title || fieldName} />
                    ) : (
                        fieldSchema.title || formatFieldName(fieldName)
                    )}
                </Label>
                <select
                    name={fieldName}
                    value={fieldValue || ""}
                    onChange={(e) => onChange(e, path)}
                    disabled={isFieldDisabled}
                    className={`w-full p-2 border rounded bg-white shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 ${isFieldRequired(fieldName, fieldSchema, path, formData) && !fieldValue ? 'border-red-500' : ''
                        }`}
                >
                    <option value="">Select {formatFieldName(fieldName)}</option>
                    {fieldSchema.enum.map((option: string) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </select>
                {errors[fieldName] && (
                    <p className="text-red-500 text-sm">{errors[fieldName]}</p>
                )}
            </div>

        );
    }

    

    if (fieldName.toLowerCase() === 'connection' && fieldSchema.endpoint) {
        return (
            <div key={fieldName} className="space-y-4">
                <div className="w-full space-y-1">
                    <Label className="text-xs font-medium text-gray-700">
                        Connection
                        {isFieldRequired(fieldName, fieldSchema, path, formData) && (
                            <span className="text-red-500 ml-0.5">*</span>
                        )}
                    </Label>
                    <select
                        name="connection_config_id"
                        value={formData.source?.connection?.connection_config_id || ""}
                        onChange={(e) => onChange(e, path)}
                        disabled={isFieldDisabled}
                        className="w-full h-8 text-sm border rounded bg-white shadow-sm ring-offset-background focus:outline-none focus:ring-1 focus:ring-ring"
                    >
                        <option value="">Select Connection</option>
                        {connectionConfigList?.map((conn) => (
                            <option key={conn.id} value={conn.id}>
                                {conn.connection_config_name} ({conn.custom_metadata?.type})
                            </option>
                        ))}
                    </select>
                </div>

                {/* Show file_path_prefix input when type is Local */}
                {selectedConnection?.custom_metadata?.type === 'Local' && (
                    <div className="w-full space-y-1">
                        <Label className="text-xs font-medium text-gray-700">
                            File Path Prefix
                        </Label>
                        <Input
                            name="file_path_prefix"
                            value={formData.source?.connection?.file_path_prefix || selectedConnection?.custom_metadata?.file_path_prefix || ""}
                            onChange={(e) => onChange(e, path)}
                            disabled={isFieldDisabled}
                            className="h-8 text-sm"
                            placeholder="Enter file path prefix"
                        />
                    </div>
                )}
            </div>
        );
    }

    return (
        <div key={fieldName} className="w-full space-y-1">
            <div className="flex items-center gap-1.5">
                <Label className="text-xs font-medium text-gray-700">
                    {fieldSchema.title || formatFieldName(fieldName)}
                    {isFieldRequired(fieldName, fieldSchema, path, formData) && (
                        <span className="text-red-500 ml-0.5">*</span>
                    )}
                </Label>
                {fieldSchema.description && (
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Info className="h-3 w-3 text-gray-400 hover:text-gray-600" />
                            </TooltipTrigger>
                            <TooltipContent>
                                <p className="text-xs max-w-xs">{fieldSchema.description}</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                )}
            </div>
            <Input
                type={fieldSchema.bh_secret ? "password" : fieldSchema.type === "number" ? "number" : "text"}
                name={fieldName}
                value={fieldValue || ""}
                onChange={(e) => onChange(e, path)}
                disabled={isFieldDisabled}
                placeholder={`Enter ${formatFieldName(fieldName)}`}
                className="h-8 text-sm"
            />
            {errors[fieldName] && (
                <p className="text-xs text-red-500">{errors[fieldName]}</p>
            )}
        </div>
    );
};