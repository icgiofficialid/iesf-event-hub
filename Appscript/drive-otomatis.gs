//Drive-Otomatis


function createDriveFolder1(data) {
  var parentFolderId = '14j7wEKHEiTwQYPW_peZJqJJMMEssIKYB'; // Ganti dengan ID folder induk yang Anda inginkan
  var parentFolder = DriveApp.getFolderById(parentFolderId);

  var folderName = data['NAMA_LENGKAP']; // Mengambil nilai dari kolom 'NAMA_LENGKAP' di spreadsheet

  // Buat folder di Google Drive
  var newFolder = parentFolder.createFolder(folderName);

  return newFolder.getId();
}