import { useState, useEffect } from 'react';
import { PricePlans, Pages, Products } from '@/constants';
import { convertTableData } from '@/utils';
import { ITableRow } from '@/types';

export const useTableData = () => {
    const [data, setData] = useState<ITableRow[]>([]);

    useEffect(() => {
        const newData = convertTableData(Pages, PricePlans, Products);
        setData(newData);
    }, []);

    const handleUpdateRecord = (record: ITableRow) => {
        setData((prev) => {
            const next = JSON.parse(JSON.stringify(prev));
            const indexToUpdate = next.findIndex((obj: { id: number; }) => obj.id === record.id);
            next[indexToUpdate] = record;
            return next;
        })
    };

    return {
        data,
        handleUpdateRecord,
    }
};