// V2
// function startNfcScan() {
//     if ('NDEFReader' in window) {
//       const statusElement = document.getElementById('status');
//       statusElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 請掃描 NFC'; // 初始狀態：請掃描 NFC，並加上旋轉的 Spinner 圖示

//       const valueInput = document.getElementById('valueInput');
//       valueInput.value = ''; // 清空數值框的值

//       const reader = new NDEFReader();

//       reader.addEventListener('reading', event => {
//         const records = event.message.records;

//         for (const record of records) {
//           console.log(record.data);
//           const decoder = new TextDecoder(record.encoding);
//           const value = decoder.decode(record.data);

//           // 將讀取到的值設定到數值框中
//           valueInput.value = value;
//         }

//         statusElement.innerHTML = '<i class="fas fa-check"></i> NFC 狀態：已讀取'; // 讀取完成後的狀態：已讀取
//       });

//       reader.scan().catch(error => {
//         console.error('Error scanning NFC: ', error);
//       });
//     } else {
//       console.error('Web NFC API is not supported in this browser.');
//       document.getElementById('status').innerHTML = '<i class="fas fa-times red"></i> NFC 功能不支援';
//     }
//   }

// V3 狀態檢測版
// function startNfcScan() {
//   if ('NDEFReader' in window) {
//     const statusElement = document.getElementById('status');
//     statusElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 請掃描 NFC'; // 初始狀態：請掃描 NFC，並加上旋轉的 Spinner 圖示

//     const valueInput = document.getElementById('valueInput');
//     valueInput.value = ''; // 清空數值框的值

//     const formatElement = document.getElementById('format');
//     formatElement.textContent = ''; // 清空格式顯示區域

//     const reader = new NDEFReader();

//     reader.addEventListener('reading', event => {
//       const records = event.message.records;

//       for (const record of records) {
//         console.log("Record data:", record.data);
//         const decoder = new TextDecoder(record.encoding);
//         const value = decoder.decode(record.data);

//         // 將讀取到的值設定到數值框中
//         valueInput.value = value;

//         // 檢查記錄類型並顯示格式
//         if (record.recordType === "text") {
//           console.log("Record type: Text");
//           formatElement.textContent += "Text format\n";
//         } else if (record.recordType === "url") {
//           console.log("Record type: URL");
//           formatElement.textContent += "URL format\n";
//         } else {
//           console.log("Custom record type:", record.recordType);
//           formatElement.textContent += "Custom record type: " + record.recordType + "\n";
//         }
//       }

//       statusElement.innerHTML = '<i class="fas fa-check"></i> NFC 狀態：已讀取'; // 讀取完成後的狀態：已讀取
//     });

//     reader.scan().catch(error => {
//       console.error('Error scanning NFC: ', error);
//     });
//   } else {
//     console.error('Web NFC API is not supported in this browser.');
//     document.getElementById('status').innerHTML = '<i class="fas fa-times red"></i> NFC 功能不支援';
//   }
// }

// V3.1
function startNfcScan() {
  if ('NDEFReader' in window) {
    const statusElement = document.getElementById('status');
    statusElement.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 請掃描 NFC'; // 初始狀態：請掃描 NFC，並加上旋轉的 Spinner 圖示

    const valueInput = document.getElementById('valueInput');
    valueInput.value = ''; // 清空數值框的值

    const formatElement = document.getElementById('format');
    formatElement.innerHTML = ''; // 清空格式顯示區域的內容

    const reader = new NDEFReader();

    reader.addEventListener('reading', event => {
      const records = event.message.records;

      for (const record of records) {
        console.log("Record data:", record.data);
        const decoder = new TextDecoder(record.encoding);
        const value = decoder.decode(record.data);

        // 將讀取到的值設定到數值框中
        valueInput.value = value;

        // 檢查記錄類型並顯示格式
        let recordType = '';
        if (record.recordType === "text") {
          console.log("Record type: Text");
          recordType = 'Text';
        } else if (record.recordType === "url") {
          console.log("Record type: URL");
          recordType = 'URL';
        } else {
          console.log("Custom record type:", record.recordType);
          recordType = 'Custom';
        }

        // 在網頁上顯示格式
        const recordElement = document.createElement('div');
        recordElement.className = 'record';
        recordElement.innerHTML = `Record type: ${recordType}`;
        formatElement.appendChild(recordElement);
      }

      statusElement.innerHTML = '<i class="fas fa-check"></i> NFC 狀態：已讀取'; // 讀取完成後的狀態：已讀取
    });

    reader.scan().catch(error => {
      console.error('Error scanning NFC: ', error);
    });
  } else {
    console.error('Web NFC API is not supported in this browser.');
    document.getElementById('status').innerHTML = '<i class="fas fa-times red"></i> NFC 功能不支援';
  }
}
