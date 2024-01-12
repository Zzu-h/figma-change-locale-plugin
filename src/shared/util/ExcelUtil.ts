import * as XLSX from 'xlsx';
import { GlobalVars } from '..';

export class ExcelUtil {
  static parseExcelFile(file: File, keyId: string): Promise<object[] | null> {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        const data = (event.target as FileReader).result;

        if (data) {
          const workbook = XLSX.read(data, { type: 'binary' });
          const sheetName = workbook.SheetNames[0];
          const sheet = workbook.Sheets[sheetName];
          const jsonData: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

          if (jsonData.length < 2) {
            resolve(null); // Insufficient data for key-value pairs
          }

          const [keys, ...values] = jsonData;
          keys.forEach((item) => {
            const key = item as string
            if(key[0] == '#'){
              GlobalVars.lanList.push(key);
            }
          })

          const parsedData = values.map((row: any[]) => {
            const entry = new Map<string, any>();
            keys.forEach((key: string, index: number) => {
              entry.set(key, row[index]);
            });
            return entry;
          }) as Map<string, any>[];

          parsedData.forEach((item) => {
            GlobalVars.mapData.set(item.get(keyId), item);
          });

          resolve(parsedData);
        } else {
          resolve(null);
        }
      };

      reader.readAsBinaryString(file);
    });
  }
}