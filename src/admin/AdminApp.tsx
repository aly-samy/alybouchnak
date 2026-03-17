import { Routes, Route, Navigate } from 'react-router-dom';
import { AdminAuthProvider, useAdminAuth } from './lib/adminAuth';
import AdminLogin from './AdminLogin';
import AdminLayout from './AdminLayout';
import Dashboard from './pages/Dashboard';
import TrackList from './pages/tracks/TrackList';
import TrackForm from './pages/tracks/TrackForm';
import AlbumList from './pages/albums/AlbumList';
import AlbumForm from './pages/albums/AlbumForm';
import PlaylistList from './pages/playlists/PlaylistList';
import PlaylistForm from './pages/playlists/PlaylistForm';
import ThemeCollectionList from './pages/themeCollections/ThemeCollectionList';
import ThemeCollectionForm from './pages/themeCollections/ThemeCollectionForm';
import ArticleList from './pages/articles/ArticleList';
import ArticleForm from './pages/articles/ArticleForm';
import FaqList from './pages/faqs/FaqList';
import FaqForm from './pages/faqs/FaqForm';
import SubscriberList from './pages/subscribers/SubscriberList';
import InboxPage from './pages/inbox/InboxPage';
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
                <Route path="playlists" element={<PlaylistList />} />
                <Route path="playlists/new" element={<PlaylistForm />} />
                <Route path="playlists/:slug/edit" element={<PlaylistForm />} />
                <Route path="themes" element={<ThemeCollectionList />} />
                <Route path="themes/new" element={<ThemeCollectionForm />} />
                <Route path="themes/:slug/edit" element={<ThemeCollectionForm />} />
                <Route path="articles" element={<ArticleList />} />
                <Route path="articles/new" element={<ArticleForm />} />
                <Route path="articles/:slug/edit" element={<ArticleForm />} />
                <Route path="faqs" element={<FaqList />} />
                <Route path="faqs/new" element={<FaqForm />} />
                <Route path="faqs/:id/edit" element={<FaqForm />} />
                <Route path="subscribers" element={<SubscriberList />} />
                <Route path="inbox" element={<InboxPage />} />
                <Route path="inbox/:threadId" element={<InboxPage />} />
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
