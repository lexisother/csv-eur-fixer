import './style.css';

console.log('test');

document.querySelector<HTMLInputElement>('#csvinput')!.addEventListener('change', function () {
  const csv = this.files?.[0];

  if (csv) {
    let reader = new FileReader();
    reader.readAsText(csv, 'UTF-8');
    reader.onload = (evt) => {
      console.log(evt.target!.result);
    };
    reader.onerror = (evt) => {};
  }
});
