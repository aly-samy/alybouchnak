import { useState, useEffect } from 'react';
import { toast } from 'sonner';

export function useNeonData<T extends { id?: number }>(resourcePath: string) {
    const [data, setData] = useState<T[]>([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const token = import.meta.env.VITE_ADMIN_PASSWORD || '';

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/.netlify/functions/neon-crud/${resourcePath}`);
            if (!res.ok) throw new Error('Failed to fetch data');
            const json = await res.json();
            setData(json);
        } catch (err) {
            console.error(err);
            toast.error('Failed to load data from Neon');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [resourcePath]);

    const saveItem = async (item: T, isNew: boolean) => {
        setSaving(true);
        try {
            const method = isNew ? 'POST' : 'PUT';
            const url = `/.netlify/functions/neon-crud/${resourcePath}${!isNew ? `/${item.id}` : ''}`;

            const res = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(item)
            });

            if (!res.ok) throw new Error('Failed to save');
            const savedItem = await res.json();

            if (isNew) {
                setData(prev => [...prev, savedItem]);
            } else {
                setData(prev => prev.map(d => d.id === savedItem.id ? savedItem : d));
            }
            return savedItem;
        } finally {
            setSaving(false);
        }
    };

    const deleteItem = async (id: number) => {
        setSaving(true);
        try {
            const res = await fetch(`/.netlify/functions/neon-crud/${resourcePath}/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            if (!res.ok) throw new Error('Failed to delete');
            setData(prev => prev.filter(d => d.id !== id));
            toast.success('Item deleted successfully');
        } catch (err) {
            console.error(err);
            toast.error('Failed to delete item');
        } finally {
            setSaving(false);
        }
    };

    return {
        data,
        loading,
        saving,
        saveItem,
        deleteItem,
        refresh: fetchData
    };
}
