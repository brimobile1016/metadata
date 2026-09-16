(() => {
  "use strict";

  /*
   * PHOTO METADATA EDITOR
   * ----------------------
   * - JPG / JPEG only
   * - Does NOT resize image
   * - Uses Canvas only when converting PNG to JPEG
   * - Does NOT re-encode JPEG
   * - Adds metadata directly into JPEG APP1
   */
  const BRANDS = {
    Xiaomi: {
      software: "MediaTek Camera Application",
      copyright: "Copyright Xiaomi Communications Co., Ltd. 2022",
      models: [
        "Xiaomi 13T",
        "Xiaomi 13T Pro",
        "Xiaomi 13",
        "Xiaomi 13 Pro",
        "Xiaomi 13 Ultra",
        "Xiaomi 12",
        "Xiaomi 12 Pro",
        "Xiaomi 12T",
        "Xiaomi 12T Pro",
        "Xiaomi 12 Lite",
        "Xiaomi 11",

        "Xiaomi 11 Lite",
        "Xiaomi 10T",
        "Xiaomi 10T Pro",
        "Xiaomi 14",
        "Xiaomi 14 Pro",
        "Xiaomi 14 Ultra",
        "Xiaomi 14T",
        "Xiaomi 14T Pro",
        "Xiaomi 15",
        "Xiaomi 15 Pro",
        "Xiaomi 15 Ultra",
        "Xiaomi 15T",
        "Xiaomi 15T Pro",
        "Xiaomi Mix Fold 2",
        "Xiaomi Mix Fold 3",
        "Xiaomi Mix Fold 4",
        "Xiaomi Mix Flip",
        "Xiaomi Civi 2",
        "Xiaomi Civi 3",
        "Xiaomi Civi 4 Pro",
        "Xiaomi Civi 5 Pro",

        "Redmi Note 10",
        "Redmi Note 10 Pro",
        "Redmi Note 11",
        "Redmi Note 11 Pro",
        "Redmi Note 11 Pro+",
        "Redmi Note 12",
        "Redmi Note 12 Pro",
        "Redmi Note 12 Pro+",
        "Redmi Note 13",
        "Redmi Note 13 Pro",
        "Redmi Note 13 Pro+",
        "Redmi Note 14",
        "Redmi Note 14 Pro",
        "Redmi Note 14 Pro+",
        "Redmi Note 15",
        "Redmi Note 15 Pro",
        "Redmi Note 15 Pro+",

        "Redmi 10",
        "Redmi 10C",
        "Redmi 12",
        "Redmi 13",
        "Redmi 14C",
        "Redmi A2",
        "Redmi A3",
        "Redmi A4",

        "POCO X3 NFC",
        "POCO X3 Pro",
        "POCO X4 Pro 5G",
        "POCO X5",
        "POCO X5 Pro 5G",
        "POCO X6",
        "POCO X6 Pro",
        "POCO X7",
        "POCO X7 Pro",
        "POCO F3",
        "POCO F4",
        "POCO F5",
        "POCO F5 Pro",
        "POCO F6",
        "POCO F6 Pro",
        "POCO F7",
        "POCO F7 Pro",
        "POCO F7 Ultra",
        "POCO M4 Pro",
        "POCO M5",
        "POCO M5s",
        "POCO M6",
        "POCO M6 Pro",
        "POCO M7 Pro",
      ],
    },

    Vivo: {
      software: "Vivo Camera",
      copyright: "Copyright vivo Mobile Communication Co., Ltd.",
      models: [
        "Vivo X100",
        "Vivo X100 Pro",
        "Vivo X100 Ultra",
        "Vivo X200",
        "Vivo X200 Pro",
        "Vivo X200 Ultra",
        "Vivo X80",
        "Vivo X80 Pro",
        "Vivo X90",
        "Vivo X90 Pro",
        "Vivo X90 Pro+",
        "Vivo V23",
        "Vivo V25",
        "Vivo V25 Pro",
        "Vivo V27",
        "Vivo V27 Pro",
        "Vivo V29",
        "Vivo V29 Pro",
        "Vivo V30",
        "Vivo V30 Pro",
        "Vivo V40",
        "Vivo V40 Pro",
        "Vivo V50",
        "Vivo V50 Lite",
        "Vivo Y22",
        "Vivo Y27",
        "Vivo Y28",
        "Vivo Y36",
        "Vivo Y100",
        "Vivo Y200",
      ],
    },

    Oppo: {
      software: "OPPO Camera",
      copyright: "Copyright OPPO",
      models: [
        "OPPO Find X3",
        "OPPO Find X3 Pro",
        "OPPO Find X5",
        "OPPO Find X5 Pro",
        "OPPO Find X6",
        "OPPO Find X6 Pro",
        "OPPO Find X7",
        "OPPO Find X7 Ultra",
        "OPPO Find X8",
        "OPPO Find X8 Pro",
        "OPPO Reno 6",
        "OPPO Reno 9",
        "OPPO Reno 10 Pro",
        "OPPO Reno 11",
        "OPPO Reno 11 Pro",
        "OPPO Reno 12",
        "Xiaomi 13T Pro",
        "Xiaomi 13",
        "Xiaomi 13 Pro",
        "Xiaomi 13 Ultra",
        "OPPO A57",
        "OPPO A58",
        "OPPO A78",
        "OPPO A79",
        "OPPO A98",
      ],
    },

    Samsung: {
      software: "Samsung Camera",
      copyright: "Copyright Samsung Electronics Co., Ltd.",
      models: [
        "Samsung Galaxy S20",
        "Samsung Galaxy S20+",
        "Samsung Galaxy S20 Ultra",
        "Samsung Galaxy S21",
        "Samsung Galaxy S21+",
        "Samsung Galaxy S21 Ultra",
        "Samsung Galaxy S22",
        "Samsung Galaxy S22+",
        "Samsung Galaxy S22 Ultra",
        "Samsung Galaxy S23",
        "Samsung Galaxy S23+",
        "Samsung Galaxy S23 Ultra",
        "Samsung Galaxy S24",
        "Samsung Galaxy S24+",
        "Samsung Galaxy S24 Ultra",
        "Samsung Galaxy S25",
        "Samsung Galaxy S25+",
        "Samsung Galaxy S25 Ultra",
        "Samsung Galaxy A52",
        "Samsung Galaxy A52s",
        "Samsung Galaxy A53",
        "Samsung Galaxy A54",
        "Samsung Galaxy A55",
        "Samsung Galaxy A56",
        "Samsung Galaxy Z Fold 3",
        "Samsung Galaxy Z Fold 4",
        "Samsung Galaxy Z Fold 5",
        "Samsung Galaxy Z Fold 6",
        "Samsung Galaxy Z Flip 3",
        "Samsung Galaxy Z Flip 4",
        "Samsung Galaxy Z Flip 5",
        "Samsung Galaxy Z Flip 6",
      ],
    },

    Apple: {
      software: "Apple iOS Camera",
      copyright: "Copyright Apple Inc.",
      models: [
        "iPhone 11",
        "iPhone 11 Pro",
        "iPhone 11 Pro Max",
        "iPhone 12",
        "iPhone 12 mini",
        "iPhone 12 Pro",
        "iPhone 12 Pro Max",
        "iPhone 13",
        "iPhone 13 mini",
        "iPhone 13 Pro",
        "iPhone 13 Pro Max",
        "iPhone 14",
        "iPhone 14 Plus",
        "iPhone 14 Pro",
        "iPhone 14 Pro Max",
        "iPhone 15",
        "iPhone 15 Plus",
        "iPhone 15 Pro",
        "iPhone 15 Pro Max",
        "iPhone 16",
        "iPhone 16 Plus",
        "iPhone 16 Pro",
        "iPhone 16 Pro Max",
        "iPhone 17",
        "iPhone 17 Air",
        "iPhone 17 Pro",
        "iPhone 17 Pro Max",
      ],
    },

    Huawei: {
      software: "Huawei Camera",
      copyright: "Copyright Huawei Technologies Co., Ltd.",
      models: [
        "Huawei P30",
        "Huawei P30 Pro",
        "Huawei P40",
        "Huawei P40 Pro",
        "Huawei P40 Pro+",
        "Huawei P50",
        "Huawei P50 Pro",
        "Huawei P60",
        "Huawei P60 Pro",
        "Huawei Pura 70",
        "Huawei Pura 70 Pro",
        "Huawei Pura 70 Ultra",
        "Huawei Mate 30",
        "Huawei Mate 30 Pro",
        "Huawei Mate 40",
        "Huawei Mate 40 Pro",
        "Huawei Mate 50",
        "Huawei Mate 50 Pro",
        "Huawei Mate 60",
        "Huawei Mate 60 Pro",
        "Huawei Mate 70",
        "Huawei Mate 70 Pro",
      ],
    },

    Realme: {
      software: "realme Camera",
      copyright: "Copyright realme",
      models: [
        "realme GT",
        "realme GT 2",
        "realme GT 2 Pro",
        "realme GT 3",
        "realme GT 5",
        "realme GT 5 Pro",
        "realme GT 6",
        "realme GT 6T",
        "realme GT 7",
        "realme GT 7 Pro",
        "realme 8",
        "realme 9",
        "realme 10",
        "realme 11",
        "realme 12",
        "realme 12 Pro",
        "realme 13",
        "realme 13 Pro",
        "realme C53",
        "realme C55",
        "realme C67",
        "realme C75",
      ],
    },

    OnePlus: {
      software: "OnePlus Camera",
      copyright: "Copyright OnePlus Technology",
      models: [
        "OnePlus 9",
        "OnePlus 9 Pro",
        "OnePlus 10 Pro",
        "OnePlus 11",
        "OnePlus 12",
        "OnePlus 12R",
        "OnePlus 13",
        "OnePlus 13R",
        "OnePlus Nord 2",
        "OnePlus Nord 3",
        "OnePlus Nord 4",
        "OnePlus Nord CE 3",
        "OnePlus Nord CE 4",
      ],
    },
  };

  const EXIF_TAGS = {
    ImageDescription: 0x010e,
    Make: 0x010f,
    Model: 0x0110,
    Software: 0x0131,
    DateTime: 0x0132,
    Artist: 0x013b,
    Copyright: 0x8298,
    UserComment: 0x9286,

    DateTimeOriginal: 0x9003,
    DateTimeDigitized: 0x9004,

    XPTitle: 0x9c9b,
    XPComment: 0x9c9c,
    XPAuthor: 0x9c9d,
    XPKeywords: 0x9c9e,
  };

  const state = {
    selectedFile: null,
    processedBlob: null,
    metadata: [],
  };

  const DEFAULT_AUTHOR = "Saipul Anuar";

  function byId(id) {
    return document.getElementById(id);
  }

  function setStatus(message, type = "") {
    const status = byId("status");

    if (!status) return;

    status.textContent = message;
    status.className = `status ${type}`.trim();
  }

  function escapeHtml(value) {
    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function getBrandOptions() {
    return Object.keys(BRANDS);
  }

  function createMetadataRow(metadataName = "", metadataValue = "") {
    const container = byId("metadataContainer");

    if (!container) return null;

    const row = document.createElement("div");
    row.className = "metadata-row";

    row.innerHTML = `
      <select class="metadata-name">
        <option value="">Pilih metadata...</option>

        <optgroup label="Camera">
          <option value="Make">Make</option>
          <option value="Model">Camera Model</option>
          <option value="Software">Software</option>
          <option value="XiaomiModel">Xiaomi Model</option>
          <option value="DeviceManufacturer">Device Manufacturer</option>
        </optgroup>

        <optgroup label="Basic EXIF">
          <option value="ImageDescription">Image Description</option>
          <option value="Artist">Artist</option>
          <option value="Copyright">Copyright</option>
          <option value="ProfileCopyright">Profile Copyright</option>
          <option value="DateTime">Date Time</option>
          <option value="UserComment">User Comment</option>
        </optgroup>

        <optgroup label="Windows / XP">
          <option value="XPTitle">XP Title</option>
          <option value="XPComment">XP Comment</option>
          <option value="XPAuthor">XP Author</option>
          <option value="XPKeywords">XP Keywords</option>
        </optgroup>
      </select>

      <input
        type="text"
        class="metadata-value"
        placeholder="Nilai metadata"
        autocomplete="off"
      />

      <button type="button" class="remove-metadata" title="Hapus">
        ×
      </button>
    `;

    const nameSelect = row.querySelector(".metadata-name");
    const valueInput = row.querySelector(".metadata-value");
    const removeButton = row.querySelector(".remove-metadata");

    nameSelect.value = metadataName;
    valueInput.value = metadataValue;

    removeButton.addEventListener("click", () => {
      row.remove();

      if (!container.querySelector(".metadata-row")) {
        createMetadataRow();
      }
    });

    container.appendChild(row);

    return row;
  }

  function clearMetadataRows() {
    const container = byId("metadataContainer");

    if (!container) return;

    container.innerHTML = "";
  }

  function updateModelList(brand) {
    const modelSelect = byId("cameraModel");

    if (!modelSelect) return;

    modelSelect.disabled = !brand || !BRANDS[brand];

    modelSelect.innerHTML = `
      <option value="">Pilih camera model...</option>
    `;

    if (!brand || !BRANDS[brand]) {
      return;
    }

    BRANDS[brand].models.forEach((model) => {
      const option = document.createElement("option");
      option.value = model;
      option.textContent = model;
      modelSelect.appendChild(option);
    });
  }

  function addAutoMetadata(name, value) {
    if (!value) return;

    const container = byId("metadataContainer");

    if (!container) return;

    const existingRows = [...container.querySelectorAll(".metadata-row")];

    const alreadyExists = existingRows.some((row) => {
      const select = row.querySelector(".metadata-name");
      return select && select.value === name;
    });

    if (alreadyExists) {
      const row = existingRows.find(
        (item) => item.querySelector(".metadata-name")?.value === name,
      );

      const input = row?.querySelector(".metadata-value");

      if (input) {
        input.value = value;
      }

      return;
    }

    const row = createMetadataRow(name, value);

    if (row) {
      const select = row.querySelector(".metadata-name");
      const input = row.querySelector(".metadata-value");

      if (select) select.value = name;
      if (input) input.value = value;
    }
  }

  function removeAutoMetadata(name) {
    const container = byId("metadataContainer");

    if (!container) return;

    const rows = [...container.querySelectorAll(".metadata-row")];

    rows.forEach((row) => {
      const select = row.querySelector(".metadata-name");

      if (select?.value === name) {
        row.remove();
      }
    });
  }

  function applyBrandPreset() {
    const brandSelect = byId("phoneBrand");
    const brand = brandSelect?.value || "";

    updateModelList(brand);

    const cameraModel = byId("cameraModel");

    if (cameraModel) {
      cameraModel.value = "";
    }

    removeAutoMetadata("Make");
    removeAutoMetadata("Model");
    removeAutoMetadata("Software");
    removeAutoMetadata("XiaomiModel");
    removeAutoMetadata("DeviceManufacturer");
    removeAutoMetadata("ProfileCopyright");

    if (!brand || !BRANDS[brand]) {
      return;
    }

    const preset = BRANDS[brand];

    /*
     * Make
     */
    addAutoMetadata("Make", brand);

    /*
     * Software
     */
    addAutoMetadata("Software", preset.software);

    /*
     * Device Manufacturer
     */
    addAutoMetadata("DeviceManufacturer", brand);

    /*
     * Copyright profile
     */
    addAutoMetadata("ProfileCopyright", preset.copyright);

    /*
     * Clear model until user chooses one.
     */
    setStatus(`${brand} dipilih. Silakan pilih Camera Model.`, "info");
  }

  function applyModelPreset() {
    const brand = byId("phoneBrand")?.value || "";
    const model = byId("cameraModel")?.value || "";

    if (!brand || !model) {
      return;
    }

    addAutoMetadata("Make", brand);
    addAutoMetadata("Model", model);
    addAutoMetadata("DeviceManufacturer", brand);
    addAutoMetadata("Artist", DEFAULT_AUTHOR);
    addAutoMetadata("XPAuthor", DEFAULT_AUTHOR);

    if (brand === "Xiaomi") {
      addAutoMetadata("XiaomiModel", model);
      addAutoMetadata(
        "ProfileCopyright",
        "Copyright Xiaomi Communications Co., Ltd. 2022",
      );
    } else if (BRANDS[brand]) {
      addAutoMetadata("ProfileCopyright", BRANDS[brand].copyright);
    }

    if (BRANDS[brand]) {
      addAutoMetadata("Software", BRANDS[brand].software);
    }

    setStatus(`${brand} ${model} siap digunakan.`, "success");
  }

  function collectMetadata() {
    const container = byId("metadataContainer");

    if (!container) {
      return [];
    }

    const rows = [...container.querySelectorAll(".metadata-row")];

    const result = [];

    rows.forEach((row) => {
      const name = row.querySelector(".metadata-name")?.value?.trim() || "";

      const value = row.querySelector(".metadata-value")?.value?.trim() || "";

      if (!name || !value) {
        return;
      }

      result.push({
        name,
        value,
      });
    });

    return result;
  }

  function formatExifDate(date) {
    const pad = (value) => String(value).padStart(2, "0");

    return (
      [date.getFullYear(), pad(date.getMonth() + 1), pad(date.getDate())].join(
        ":",
      ) +
      ` ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`
    );
  }

  function addMetadataIfMissing(metadata, name, value) {
    if (!value || metadata.some((item) => item.name === name)) {
      return;
    }

    metadata.push({ name, value });
  }

  function addGeneratedMetadata(metadata) {
    const generatedAt = new Date();
    const generatedDate = formatExifDate(generatedAt);
    const filename = state.selectedFile?.name || "Photo";
    const title = filename.replace(/\.[^.]+$/, "");

    addMetadataIfMissing(metadata, "Artist", DEFAULT_AUTHOR);
    addMetadataIfMissing(metadata, "XPAuthor", DEFAULT_AUTHOR);
    addMetadataIfMissing(metadata, "DateTime", generatedDate);
    addMetadataIfMissing(metadata, "XPTitle", title);
    addMetadataIfMissing(
      metadata,
      "XPComment",
      `Generated ${generatedDate} by Photo Metadata Editor`,
    );
    addMetadataIfMissing(metadata, "XPKeywords", "Photo, JPEG");
  }

  function utf8Bytes(text) {
    return new TextEncoder().encode(text);
  }

  function asciiBytes(text) {
    const bytes = [];

    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);

      bytes.push(code <= 0x7f ? code : 0x3f);
    }

    return new Uint8Array(bytes);
  }

  function utf16leBytes(text) {
    const bytes = new Uint8Array(text.length * 2);

    for (let i = 0; i < text.length; i++) {
      const code = text.charCodeAt(i);

      bytes[i * 2] = code & 0xff;
      bytes[i * 2 + 1] = (code >> 8) & 0xff;
    }

    return bytes;
  }

  function concatUint8Arrays(...arrays) {
    const total = arrays.reduce((sum, array) => sum + array.length, 0);

    const result = new Uint8Array(total);

    let offset = 0;

    for (const array of arrays) {
      result.set(array, offset);
      offset += array.length;
    }

    return result;
  }

  function readUint16BE(bytes, offset) {
    return (bytes[offset] << 8) | bytes[offset + 1];
  }

  function readUint16LE(bytes, offset) {
    return bytes[offset] | (bytes[offset + 1] << 8);
  }

  function readUint32BE(bytes, offset) {
    return (
      (((bytes[offset] << 24) >>> 0) |
        (bytes[offset + 1] << 16) |
        (bytes[offset + 2] << 8) |
        bytes[offset + 3]) >>>
      0
    );
  }

  function writeUint16BE(bytes, offset, value) {
    bytes[offset] = (value >> 8) & 0xff;
    bytes[offset + 1] = value & 0xff;
  }

  function writeUint32BE(bytes, offset, value) {
    bytes[offset] = (value >>> 24) & 0xff;
    bytes[offset + 1] = (value >>> 16) & 0xff;
    bytes[offset + 2] = (value >>> 8) & 0xff;
    bytes[offset + 3] = value & 0xff;
  }

  function writeUint16LE(bytes, offset, value) {
    bytes[offset] = value & 0xff;
    bytes[offset + 1] = (value >> 8) & 0xff;
  }

  function removeExistingExif(bytes) {
    if (bytes.length < 4 || bytes[0] !== 0xff || bytes[1] !== 0xd8) {
      throw new Error("File bukan JPEG yang valid.");
    }

    const output = [new Uint8Array([bytes[0], bytes[1]])];

    let offset = 2;

    while (offset + 4 <= bytes.length) {
      if (bytes[offset] !== 0xff) {
        output.push(bytes.slice(offset));
        break;
      }

      const marker = bytes[offset + 1];

      if (marker === 0xda) {
        output.push(bytes.slice(offset));
        break;
      }

      if (marker === 0xd9) {
        output.push(bytes.slice(offset));
        break;
      }

      if (marker >= 0xd0 && marker <= 0xd7) {
        output.push(bytes[offset], bytes[offset + 1]);
        offset += 2;
        continue;
      }

      const segmentLength = readUint16BE(bytes, offset + 2);

      if (segmentLength < 2 || offset + 2 + segmentLength > bytes.length) {
        output.push(bytes.slice(offset));
        break;
      }

      const isAPP1 = marker === 0xe1;

      const payloadStart = offset + 4;
      const identifier = bytes.slice(
        payloadStart,
        Math.min(payloadStart + 6, bytes.length),
      );

      const isExif =
        isAPP1 &&
        identifier.length >= 6 &&
        identifier[0] === 0x45 &&
        identifier[1] === 0x78 &&
        identifier[2] === 0x69 &&
        identifier[3] === 0x66 &&
        identifier[4] === 0x00 &&
        identifier[5] === 0x00;

      if (!isExif) {
        output.push(bytes.slice(offset, offset + 2 + segmentLength));
      }

      offset += 2 + segmentLength;
    }

    return concatUint8Arrays(...output);
  }

  /*
   * Converts UI metadata names into standard EXIF tags.
   *
   * Xiaomi Model is represented by the standard EXIF Model tag.
   * Device Manufacturer is represented by Make.
   * Profile Copyright is represented by Copyright.
   *
   * This keeps the resulting file compatible with normal EXIF readers.
   */
  function normalizeMetadata(metadata) {
    const normalized = {};

    metadata.forEach(({ name, value }) => {
      if (!value) return;

      switch (name) {
        case "Make":
        case "DeviceManufacturer":
          normalized.Make = value;
          break;

        case "Model":
        case "XiaomiModel":
          normalized.Model = value;
          break;

        case "Software":
          normalized.Software = value;
          break;

        case "Copyright":
        case "ProfileCopyright":
          normalized.Copyright = value;
          break;

        case "ImageDescription":
          normalized.ImageDescription = value;
          break;

        case "Artist":
          normalized.Artist = value;
          break;

        case "DateTime":
          normalized.DateTime = value;
          break;

        case "UserComment":
          normalized.UserComment = value;
          break;

        case "XPTitle":
          normalized.XPTitle = value;
          break;

        case "XPComment":
          normalized.XPComment = value;
          break;

        case "XPAuthor":
          normalized.XPAuthor = value;
          break;

        case "XPKeywords":
          normalized.XPKeywords = value;
          break;

        default:
          break;
      }
    });

    return normalized;
  }

  function makeAsciiField(value) {
    const bytes = asciiBytes(value);

    const terminated =
      bytes.length === 0 || bytes[bytes.length - 1] !== 0
        ? concatUint8Arrays(bytes, new Uint8Array([0]))
        : bytes;

    return {
      type: 2,
      bytes: terminated,
    };
  }

  function makeUndefinedField(value) {
    const bytes = utf8Bytes(value);

    return {
      type: 7,
      bytes,
    };
  }

  function makeXpField(value) {
    let bytes = utf16leBytes(value);

    bytes = concatUint8Arrays(bytes, new Uint8Array([0, 0]));

    return {
      type: 1,
      bytes,
    };
  }

  function createExif(metadata) {
    const normalized = normalizeMetadata(metadata);

    const ifdEntries = [];
    const exifEntries = [];

    function addAscii(ifd, tag, value) {
      if (!value) return;

      const field = makeAsciiField(value);

      ifd.push({
        tag,
        type: field.type,
        bytes: field.bytes,
      });
    }

    function addUndefined(ifd, tag, value) {
      if (!value) return;

      const field = makeUndefinedField(value);

      ifd.push({
        tag,
        type: field.type,
        bytes: field.bytes,
      });
    }

    function addXp(ifd, tag, value) {
      if (!value) return;

      const field = makeXpField(value);

      ifd.push({
        tag,
        type: field.type,
        bytes: field.bytes,
      });
    }

    addAscii(
      ifdEntries,
      EXIF_TAGS.ImageDescription,
      normalized.ImageDescription,
    );

    addAscii(ifdEntries, EXIF_TAGS.Make, normalized.Make);

    addAscii(ifdEntries, EXIF_TAGS.Model, normalized.Model);

    addAscii(ifdEntries, EXIF_TAGS.Software, normalized.Software);

    addAscii(ifdEntries, EXIF_TAGS.DateTime, normalized.DateTime);

    addAscii(exifEntries, EXIF_TAGS.DateTimeOriginal, normalized.DateTime);

    addAscii(exifEntries, EXIF_TAGS.DateTimeDigitized, normalized.DateTime);

    addAscii(ifdEntries, EXIF_TAGS.Artist, normalized.Artist);

    addAscii(ifdEntries, EXIF_TAGS.Copyright, normalized.Copyright);

    addUndefined(exifEntries, EXIF_TAGS.UserComment, normalized.UserComment);

    addXp(ifdEntries, EXIF_TAGS.XPTitle, normalized.XPTitle);

    addXp(ifdEntries, EXIF_TAGS.XPComment, normalized.XPComment);

    addXp(ifdEntries, EXIF_TAGS.XPAuthor, normalized.XPAuthor);

    addXp(ifdEntries, EXIF_TAGS.XPKeywords, normalized.XPKeywords);

    /*
     * EXIF header + TIFF header.
     *
     * TIFF:
     * MM
     * 0x002A
     * Offset to IFD0 = 8
     */

    const exifHeader = new Uint8Array(6);

    exifHeader.set([0x45, 0x78, 0x69, 0x66, 0x00, 0x00]);

    /*
     * Calculate complete layout BEFORE assigning offsets.
     *
     * This fixes the previous IFD overlap problem.
     */

    const ifd0EntryCount = ifdEntries.length + (exifEntries.length > 0 ? 1 : 0);

    const ifd0Offset = 8;

    const ifd0Size = 2 + ifd0EntryCount * 12 + 4;

    let exifIfdOffset = ifd0Offset + ifd0Size;

    const exifIfdSize =
      exifEntries.length > 0 ? 2 + exifEntries.length * 12 + 4 : 0;

    let dataOffset = exifIfdOffset + exifIfdSize;

    const dataBlocks = [];

    function prepareEntries(entries) {
      return entries.map((entry) => {
        const byteLength = entry.bytes.length;

        let offset = 0;

        if (byteLength > 4) {
          offset = dataOffset;

          dataBlocks.push({
            offset,
            bytes: entry.bytes,
          });

          dataOffset += byteLength;

          if (dataOffset % 2 !== 0) {
            dataOffset++;
          }
        }

        return {
          ...entry,
          offset,
        };
      });
    }

    const preparedIfdEntries = prepareEntries(ifdEntries);

    const preparedExifEntries = prepareEntries(exifEntries);

    /*
     * TIFF body
     */

    const tiffLength = dataOffset;

    const tiff = new Uint8Array(tiffLength);

    /*
     * TIFF header
     */
    tiff[0] = 0x4d;
    tiff[1] = 0x4d;

    writeUint16BE(tiff, 2, 0x002a);

    writeUint32BE(tiff, 4, ifd0Offset);

    /*
     * IFD0
     */

    writeUint16BE(tiff, ifd0Offset, ifd0EntryCount);

    let entryPosition = ifd0Offset + 2;

    preparedIfdEntries.forEach((entry) => {
      writeUint16BE(tiff, entryPosition, entry.tag);

      writeUint16BE(tiff, entryPosition + 2, entry.type);

      writeUint32BE(tiff, entryPosition + 4, entry.bytes.length);

      if (entry.bytes.length <= 4) {
        tiff.set(entry.bytes, entryPosition + 8);
      } else {
        writeUint32BE(tiff, entryPosition + 8, entry.offset);
      }

      entryPosition += 12;
    });

    /*
     * EXIF SubIFD pointer
     */

    if (preparedExifEntries.length > 0) {
      writeUint16BE(tiff, entryPosition, 0x8769);

      writeUint16BE(tiff, entryPosition + 2, 4);

      writeUint32BE(tiff, entryPosition + 4, 1);

      writeUint32BE(tiff, entryPosition + 8, exifIfdOffset);

      entryPosition += 12;
    }

    /*
     * Next IFD pointer = 0
     */

    writeUint32BE(tiff, entryPosition, 0);

    /*
     * EXIF IFD
     */

    if (preparedExifEntries.length > 0) {
      writeUint16BE(tiff, exifIfdOffset, preparedExifEntries.length);

      let position = exifIfdOffset + 2;

      preparedExifEntries.forEach((entry) => {
        writeUint16BE(tiff, position, entry.tag);

        writeUint16BE(tiff, position + 2, entry.type);

        writeUint32BE(tiff, position + 4, entry.bytes.length);

        if (entry.bytes.length <= 4) {
          tiff.set(entry.bytes, position + 8);
        } else {
          writeUint32BE(tiff, position + 8, entry.offset);
        }

        position += 12;
      });

      writeUint32BE(tiff, position, 0);
    }

    /*
     * Data blocks
     */

    dataBlocks.forEach((block) => {
      tiff.set(block.bytes, block.offset);
    });

    /*
     * APP1 length includes:
     * 2 bytes length itself
     * EXIF 6 bytes
     * TIFF data
     */

    const app1PayloadLength = exifHeader.length + tiff.length;

    const app1Length = app1PayloadLength + 2;

    if (app1Length > 0xffff) {
      throw new Error("Metadata terlalu besar untuk APP1 JPEG.");
    }

    const app1 = new Uint8Array(2 + 2 + app1PayloadLength);

    app1[0] = 0xff;
    app1[1] = 0xe1;

    writeUint16BE(app1, 2, app1Length);

    app1.set(exifHeader, 4);

    app1.set(tiff, 4 + exifHeader.length);

    return app1;
  }

  function insertExif(jpegBytes, exifSegment) {
    return concatUint8Arrays(
      jpegBytes.slice(0, 2),
      exifSegment,
      jpegBytes.slice(2),
    );
  }

  async function convertPngToJpegBytes(file) {
    if (typeof createImageBitmap !== "function") {
      throw new Error("Browser tidak mendukung konversi PNG ke JPEG.");
    }

    const imageBitmap = await createImageBitmap(file);
    const canvas = document.createElement("canvas");

    canvas.width = imageBitmap.width;
    canvas.height = imageBitmap.height;

    const context = canvas.getContext("2d");

    if (!context) {
      imageBitmap.close();
      throw new Error("Canvas tidak tersedia untuk konversi PNG.");
    }

    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.drawImage(imageBitmap, 0, 0);
    imageBitmap.close();

    const jpegBlob = await new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (blob) {
            resolve(blob);
            return;
          }

          reject(new Error("PNG gagal dikonversi ke JPEG."));
        },
        "image/jpeg",
        0.95,
      );
    });

    return new Uint8Array(await jpegBlob.arrayBuffer());
  }

  async function processMetadata() {
    if (!state.selectedFile) {
      setStatus(
        "Silakan pilih foto JPG, JPEG, atau PNG terlebih dahulu.",
        "error",
      );

      return;
    }

    const metadata = collectMetadata();

    addGeneratedMetadata(metadata);

    if (metadata.length === 0) {
      setStatus("Belum ada metadata yang diisi.", "error");

      return;
    }

    try {
      setStatus("Sedang memproses metadata...", "info");

      const isPng =
        state.selectedFile.type === "image/png" ||
        /\.png$/i.test(state.selectedFile.name);

      const sourceBytes = isPng
        ? await convertPngToJpegBytes(state.selectedFile)
        : new Uint8Array(await state.selectedFile.arrayBuffer());

      /*
       * Remove existing EXIF while preserving
       * all JPEG image data.
       */
      const cleanedJpeg = removeExistingExif(sourceBytes);

      /*
       * Create fresh EXIF.
       */
      const exif = createExif(metadata);

      /*
       * Insert EXIF immediately after SOI.
       */
      const output = insertExif(cleanedJpeg, exif);

      state.processedBlob = new Blob([output], { type: "image/jpeg" });

      const downloadButton = byId("downloadPhoto");

      if (downloadButton) {
        downloadButton.hidden = false;
        downloadButton.disabled = false;
      }

      setStatus(
        isPng
          ? "Metadata berhasil ditambahkan. PNG dikonversi ke JPEG."
          : "Metadata berhasil ditambahkan. Foto tidak di-resize.",
        "success",
      );
    } catch (error) {
      console.error(error);

      state.processedBlob = null;

      const downloadButton = byId("downloadPhoto");

      if (downloadButton) {
        downloadButton.hidden = true;
      }

      setStatus(`Gagal memproses foto: ${error.message}`, "error");
    }
  }

  function downloadProcessedPhoto() {
    if (!state.processedBlob) {
      setStatus("Belum ada foto hasil yang siap di-download.", "error");

      return;
    }

    const originalName = state.selectedFile?.name || "photo.jpg";

    const baseName = originalName
      .replace(/\.[^.]+$/, "")
      .replace(/[<>:"/\\|?*]/g, "_");

    const filename = `${baseName}_metadata.jpeg`;

    const url = URL.createObjectURL(state.processedBlob);

    const anchor = document.createElement("a");

    anchor.href = url;
    anchor.download = filename;

    document.body.appendChild(anchor);

    anchor.click();

    anchor.remove();

    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);

    setStatus(`Download selesai: ${filename}`, "success");
  }

  function handlePhotoSelected(event) {
    const file = event.target.files?.[0];

    if (!file) {
      state.selectedFile = null;
      return;
    }

    const isJpeg = file.type === "image/jpeg" || /\.(jpe?g)$/i.test(file.name);
    const isPng = file.type === "image/png" || /\.png$/i.test(file.name);

    if (!isJpeg && !isPng) {
      state.selectedFile = null;

      event.target.value = "";

      setStatus("Format yang didukung hanya JPG/JPEG/PNG.", "error");

      return;
    }

    state.selectedFile = file;
    state.processedBlob = null;

    const downloadButton = byId("downloadPhoto");

    if (downloadButton) {
      downloadButton.hidden = true;
    }

    setStatus(`Foto dipilih: ${file.name}`, "success");
  }

  function initialize() {
    const photoInput = byId("photoInput");

    const brandSelect = byId("phoneBrand");

    const modelSelect = byId("cameraModel");

    const addButton = byId("addMetadata");

    const submitButton = byId("submitMetadata");

    const downloadButton = byId("downloadPhoto");

    /*
     * Photo
     */
    photoInput?.addEventListener("change", handlePhotoSelected);

    /*
     * Brand
     */
    brandSelect?.addEventListener("change", applyBrandPreset);

    /*
     * Camera model
     */
    modelSelect?.addEventListener("change", applyModelPreset);

    /*
     * + Metadata
     */
    addButton?.addEventListener("click", () => {
      createMetadataRow();
    });

    /*
     * Submit
     */
    submitButton?.addEventListener("click", processMetadata);

    /*
     * Download
     */
    downloadButton?.addEventListener("click", downloadProcessedPhoto);

    /*
     * Existing metadata rows from HTML.
     * If there isn't one, create one.
     */
    const container = byId("metadataContainer");

    if (container && !container.querySelector(".metadata-row")) {
      createMetadataRow();
    }

    /*
     * Populate brand dropdown.
     */
    if (brandSelect) {
      brandSelect.innerHTML = `
        <option value="">
          Pilih merek HP...
        </option>
        ${getBrandOptions()
          .map(
            (brand) =>
              `<option value="${escapeHtml(brand)}">${escapeHtml(brand)}</option>`,
          )
          .join("")}
      `;
    }

    /*
     * Initially disable model selection.
     */
    if (modelSelect) {
      modelSelect.innerHTML = `
        <option value="">
          Pilih merek HP terlebih dahulu...
        </option>
      `;
    }

    /*
     * Download initially hidden.
     */
    if (downloadButton) {
      downloadButton.hidden = true;
      downloadButton.disabled = true;
    }

    setStatus("Pilih foto JPG dan atur metadata.", "info");
  }

  /*
   * Public API
   */
  window.PhotoMetadataEditor = {
    BRANDS,
    addMetadataRow: createMetadataRow,
    collectMetadata,
    processMetadata,
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initialize);
  } else {
    initialize();
  }
})();
