import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminAuthProvider, useAdminAuth } from './lib/adminAuth';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';
import Dashboard from './pages/Dashboard';
import TrackList from './pages/tracks/TrackList';
import TrackForm from './pages/tracks/TrackForm';
import AlbumList from './pages/albums/AlbumList';
import AlbumForm from './pages/albums/AlbumForm';
import { Toaster } from 'sonner';

function AdminRoutes() {
    const { isAuthenticated } = useAdminAuth();

    if (!isAuthenticated) {
        return <AdminLogin />;
    }

    return (
        <Routes>
            <Route element={<AdminLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="tracks" element={<TrackList />} />
                <Route path="tracks/new" element={<TrackForm />} />
                <Route path="tracks/:id/edit" element={<TrackForm />} />
                <Route path="albums" element={<AlbumList />} />
                <Route path="albums/new" element={<AlbumForm />} />
                <Route path="albums/:slug/edit" element={<AlbumForm />} />
                <Route path="*" element={<Navigate to="/admin" replace />} />
            </Route>
        </Routes>
    );
}

export default function AdminApp() {
    return (
        <AdminAuthProvider>
            <AdminRoutes />
            <Toaster
                theme="dark"
                position="bottom-right"
                toastOptions={{
                    style: {
                        background: '#1e293b',
                        border: '1px solid #334155',
                        color: '#f1f5f9',
                    },
                }}
            />
        </AdminAuthProvider>
    );
}
