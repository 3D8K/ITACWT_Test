import { ITableRow, IPreConverted, createdAtAlternatives, nameAlternatives } from "@/types";

function convert(item: IPreConverted): ITableRow {
    const { id, name, active, createdAt } = item;

    const text = name;
    const status = active;
    const created = createdAt;

    return {
        id: id,
        name: text ? text : "",
        active: status,
        createdAt: created ? created : "",
    };
}

export function convertTableData(...args: Array<Array<IPreConverted>>): Array<ITableRow> {

    const allData = [];
    const dateCreated = Object.keys(createdAtAlternatives)
    const names = Object.keys(nameAlternatives)

    const flatArgs = args.reduce((acc, val) => acc.concat(val), []);
    
    for (const data of flatArgs) {
        const flagUpdated = {
            name: false,
            createdAt: false,
        };

        for (const key in data) {
            if (!flagUpdated.createdAt || !flagUpdated.name) {
                if (!flagUpdated.createdAt && dateCreated.includes(key)) {
                    Object.assign(data, { createdAt: data[key as keyof IPreConverted]})
                    flagUpdated.createdAt = true;
                }
                if (!flagUpdated.name && names.includes(key)) {
                    Object.assign(data, { name: data[key as keyof IPreConverted] })
                    flagUpdated.name = true;
                }
            }
        }
        allData.push(convert(data));
    }

    return allData;
}