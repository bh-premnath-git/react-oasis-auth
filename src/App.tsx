
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { KeycloakProvider } from "./hooks/useKeycloak";
import ErrorBoundary from "./components/ErrorBoundary";
import ProtectedRoute from "./components/ProtectedRoute";
import ProtectedLayout from "./components/ProtectedLayout";
import Navbar from "./components/Navbar";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { lazy, Suspense } from "react";
import { ROUTES } from "./config/routes";

// Lazy-loaded components for the protected routes
const DataCatalog = lazy(() => import("./pages/data-catalog/DataCatalog"));
const XplorerPage = lazy(() => import("./pages/data-catalog/XplorerPage"));
const DatasourceImport = lazy(() => import("./pages/data-catalog/DatasourceImport"));
const DesignerDashboard = lazy(() => import("./pages/designers/DesignerDashboard"));
const BuildDataPipeline = lazy(() => import("./pages/designers/BuildDataPipeline"));
const DataPipeCanvas = lazy(() => import("./pages/designers/DataPipelineCanvas"));
const ManageFlow = lazy(() => import("./pages/designers/ManageFlow"));
const FlowCanvas = lazy(() => import("./pages/designers/FlowCanvas"));
const DataOpsHub = lazy(() => import("./pages/dataops/DataopsHub"));
const OpsHub = lazy(() => import("./pages/dataops/OpsHub"));
const AlertsHub = lazy(() => import("./pages/dataops/AlertsHub"));
const ReleaseBundle = lazy(() => import("./pages/dataops/ReleaseBundle"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminManage"));
const Users = lazy(() => import("./pages/admin/user/UserList"));
const AddUser = lazy(() => import("./pages/admin/user/UserAdd"));
const EditUser = lazy(() => import("./pages/admin/user/UserEdit"));
const Projects = lazy(() => import("./pages/admin/project/ProjectList"));
const AddProject = lazy(() => import("./pages/admin/project/ProjectAdd"));
const EditProject = lazy(() => import("./pages/admin/project/ProjectEdit"));
const Environment = lazy(() => import("./pages/admin/environment/EnvironmentList"));
const AddEnvironment = lazy(() => import("./pages/admin/environment/EnvironmentAdd"));
const EditEnvironment = lazy(() => import("./pages/admin/environment/EnvironmentEdit"));
const Connection = lazy(() => import("./pages/admin/connection/ConnectionList"));
const AddConnection = lazy(() => import("./pages/admin/connection/ConnectionAdd"));
const EditConnection = lazy(() => import("./pages/admin/connection/ConnectionEdit"));

// Create Loading component for Suspense
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="w-8 h-8 border-t-2 border-b-2 border-primary rounded-full animate-spin"></div>
  </div>
);

const queryClient = new QueryClient();

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <KeycloakProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route
                path={ROUTES.INDEX}
                element={
                  <>
                    <Navbar />
                    <div className="flex-1">
                      <Index />
                    </div>
                  </>
                }
              />

              <Route path={ROUTES.LOGIN} element={<Login />} />

              {/* Protected Routes */}
              <Route
                element={
                  <ProtectedRoute>
                    <ProtectedLayout />
                  </ProtectedRoute>
                }
              >
                {/* Default Dashboard Routes */}
                <Route path={ROUTES.DASHBOARD} element={<Dashboard />} />
                <Route path={ROUTES.PROFILE} element={<Profile />} />
                <Route path={ROUTES.SETTINGS} element={<Settings />} />

                {/* Data Catalog Routes */}
                <Route path={ROUTES.DATA_CATALOG} element={
                  <Suspense fallback={<LoadingFallback />}>
                    <DataCatalog />
                  </Suspense>
                } />
                <Route path={`${ROUTES.DATA_CATALOG}/xplorer`} element={
                  <Suspense fallback={<LoadingFallback />}>
                    <XplorerPage />
                  </Suspense>
                } />
                <Route path={`${ROUTES.DATA_CATALOG}/datasource-import`} element={
                  <Suspense fallback={<LoadingFallback />}>
                    <DatasourceImport />
                  </Suspense>
                } />

                {/* Designer Routes */}
                <Route path={ROUTES.DESIGNERS.INDEX} element={
                  <Suspense fallback={<LoadingFallback />}>
                    <DesignerDashboard />
                  </Suspense>
                } />
                <Route path={ROUTES.DESIGNERS.BUILD_PIPELINE} element={
                  <Suspense fallback={<LoadingFallback />}>
                    <BuildDataPipeline />
                  </Suspense>
                } />
                <Route path="/designers/build-playground/:id" element={
                  <Suspense fallback={<LoadingFallback />}>
                    <DataPipeCanvas />
                  </Suspense>
                } />
                <Route path={ROUTES.DESIGNERS.MANAGE_FLOW} element={
                  <Suspense fallback={<LoadingFallback />}>
                    <ManageFlow />
                  </Suspense>
                } />
                <Route path="/designers/flow-playground/:id" element={
                  <Suspense fallback={<LoadingFallback />}>
                    <FlowCanvas />
                  </Suspense>
                } />

                {/* DataOps Routes */}
                <Route path={ROUTES.DATAOPS.INDEX} element={
                  <Suspense fallback={<LoadingFallback />}>
                    <DataOpsHub />
                  </Suspense>
                } />
                <Route path={ROUTES.DATAOPS.OPS_HUB} element={
                  <Suspense fallback={<LoadingFallback />}>
                    <OpsHub />
                  </Suspense>
                } />
                <Route path={ROUTES.DATAOPS.ALERTS} element={
                  <Suspense fallback={<LoadingFallback />}>
                    <AlertsHub />
                  </Suspense>
                } />
                <Route path={ROUTES.DATAOPS.RELEASE} element={
                  <Suspense fallback={<LoadingFallback />}>
                    <ReleaseBundle />
                  </Suspense>
                } />

                {/* Admin Routes */}
                <Route path={ROUTES.ADMIN.INDEX} element={
                  <Suspense fallback={<LoadingFallback />}>
                    <AdminDashboard />
                  </Suspense>
                } />
                <Route path={ROUTES.ADMIN.USERS.INDEX} element={
                  <Suspense fallback={<LoadingFallback />}>
                    <Users />
                  </Suspense>
                } />
                <Route path={ROUTES.ADMIN.USERS.ADD} element={
                  <Suspense fallback={<LoadingFallback />}>
                    <AddUser />
                  </Suspense>
                } />
                <Route path="/admin-console/users/edit/:id" element={
                  <Suspense fallback={<LoadingFallback />}>
                    <EditUser />
                  </Suspense>
                } />
                <Route path={ROUTES.ADMIN.PROJECTS.INDEX} element={
                  <Suspense fallback={<LoadingFallback />}>
                    <Projects />
                  </Suspense>
                } />
                <Route path={ROUTES.ADMIN.PROJECTS.ADD} element={
                  <Suspense fallback={<LoadingFallback />}>
                    <AddProject />
                  </Suspense>
                } />
                <Route path="/admin-console/projects/edit/:id" element={
                  <Suspense fallback={<LoadingFallback />}>
                    <EditProject />
                  </Suspense>
                } />
                <Route path={ROUTES.ADMIN.ENVIRONMENT.INDEX} element={
                  <Suspense fallback={<LoadingFallback />}>
                    <Environment />
                  </Suspense>
                } />
                <Route path={ROUTES.ADMIN.ENVIRONMENT.ADD} element={
                  <Suspense fallback={<LoadingFallback />}>
                    <AddEnvironment />
                  </Suspense>
                } />
                <Route path="/admin-console/environment/edit/:id" element={
                  <Suspense fallback={<LoadingFallback />}>
                    <EditEnvironment />
                  </Suspense>
                } />
                <Route path={ROUTES.ADMIN.CONNECTION.INDEX} element={
                  <Suspense fallback={<LoadingFallback />}>
                    <Connection />
                  </Suspense>
                } />
                <Route path={ROUTES.ADMIN.CONNECTION.ADD} element={
                  <Suspense fallback={<LoadingFallback />}>
                    <AddConnection />
                  </Suspense>
                } />
                <Route path="/admin-console/connection/edit/:id" element={
                  <Suspense fallback={<LoadingFallback />}>
                    <EditConnection />
                  </Suspense>
                } />
              </Route>
              
              {/* Catch all not found routes */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </KeycloakProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
