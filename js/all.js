async function readNFCData() {
  const button = document.getElementById("nfcButton");
  button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 讀取中...';
  button.disabled = true;

  try {
    // 判斷是否支援 Web NFC
    if ("NDEFReader" in window) {
      // 檢查權限狀態
      const nfcPermissionStatus = await navigator.permissions.query({
        name: "nfc",
      });
      if (nfcPermissionStatus.state === "granted") {
        // 已開啟權限
        const ndef = new NDEFReader();
        await ndef.scan();

        ndef.addEventListener("readingerror", () => {
          console.log("讀取錯誤");
        });

        ndef.addEventListener("reading", ({ message, serialNumber }) => {
          console.log(`> Serial Number: ${serialNumber}`);
          console.log(`> Records: (${message.records.length})`);

          // 解析每筆資料
          const nfcDataElement = document.getElementById("nfcData");
          nfcDataElement.innerHTML = "";
          for (const record of message.records) {
            const recordTypeElement = document.createElement("p");
            recordTypeElement.textContent = "Record type: " + record.recordType;
            nfcDataElement.appendChild(recordTypeElement);

            const mediaTypeElement = document.createElement("p");
            mediaTypeElement.textContent = "MIME type: " + record.mediaType;
            nfcDataElement.appendChild(mediaTypeElement);

            const recordIdElement = document.createElement("p");
            recordIdElement.textContent = "Record id: " + record.id;
            nfcDataElement.appendChild(recordIdElement);

            switch (record.recordType) {
              case "text":
                // 處理文字類型資料
                const textDataElement = document.createElement("p");
                textDataElement.textContent = "Text data: " + record.data;
                nfcDataElement.appendChild(textDataElement);
                break;
              case "url":
                // 處理URL類型資料
                const urlDataElement = document.createElement("p");
                urlDataElement.textContent = "URL data: " + record.data;
                nfcDataElement.appendChild(urlDataElement);
                break;
              default:
                // 處理其他類型資料
                const otherDataElement = document.createElement("p");
                otherDataElement.textContent = "其他類型資料";
                nfcDataElement.appendChild(otherDataElement);
            }
          }
        });
      } else {
        // 未開啟權限
        console.log("尚未取得NFC權限");
      }
    } else {
      console.log("瀏覽器不支援Web NFC");
    }
  } catch (error) {
    console.log("錯誤: " + error);
  }

  button.innerHTML = '<i class="fas fa-play"></i> 讀取NFC資料';
  button.disabled = false;
}