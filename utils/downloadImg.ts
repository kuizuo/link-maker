
export async function downloadImg(selector: string, fileName: string = 'image.png') {
  const div = document.querySelector(selector) as HTMLDivElement;
  if (!div) {
    return console.error(`No element found with selector: ${selector}`);
  }
  
  // @ts-ignore
  const canvas = await html2canvas(div, { 
    backgroundColor: null,
    sacle: 40,
    allowTaint: true, useCORS: true
  })
  
  const a = document.createElement('a');
  a.href = canvas.toDataURL('image/png');
  a.download = fileName;
  a.click();
}
