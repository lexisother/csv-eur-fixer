import { parse } from 'csv-parse/browser/esm/sync';
import { stringify } from 'csv-stringify/browser/esm/sync';
import './style.css';

interface Product {
  price: string;
  currency: string;
  store_code: string;
}

document.querySelector<HTMLInputElement>('#csvinput')!.addEventListener('change', function () {
  const csv = this.files?.[0];

  if (csv) {
    let reader = new FileReader();
    reader.readAsText(csv, 'UTF-8');
    reader.onload = (evt) => {
      // wtf
      const content = evt.target!.result!.toString();
      const header = content.split('\n')[0];

      const products: Product[] = parse(content, {
        columns: true,
        skip_empty_lines: true,
      });
      for (let p of products) {
        p.price = `${p.price} ${p.currency}`;
        p.store_code = 'MNT';
      }
      const res = `${header},store_code\n${stringify(products)}`;
      console.log(res);

      const b = new Blob([res], { type: 'application/octet-stream' });
      const u = URL.createObjectURL(b);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = u;
      a.download = csv.name;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(u);
      a.remove();
    };
    reader.onerror = (evt) => {};
  }
});
