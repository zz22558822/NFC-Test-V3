let nfc;
let nfcDataContainer;

// 初始化NFC
async function initNFC() {
  try {
    nfc = new NDEFReader();
    await nfc.scan();
    
    nfcDataContainer = document.getElementById('nfcDataContainer');
    
    nfc.addEventListener('reading', ({ message }) => {
      nfcDataContainer.innerHTML = '';
      
      message.records.forEach(record => {
        const p = document.createElement('p');
        p.textContent = `資料類型：${record.recordType}, 資料內容：${record.data}`;
        nfcDataContainer.appendChild(p);
      });
    });
    
    console.log('NFC初始化完成');
  } catch (error) {
    console.error('無法初始化NFC:', error);
  }
}

// 開始讀取NFC資料
function startReading() {
  if (nfc) {
    nfc.start();
    console.log('開始讀取NFC資料');
  } else {
    console.error('NFC未初始化');
  }
}

// 停止讀取NFC資料
function stopReading() {
  if (nfc) {
    nfc.stop();
    console.log('停止讀取NFC資料');
  } else {
    console.error('NFC未初始化');
  }
}