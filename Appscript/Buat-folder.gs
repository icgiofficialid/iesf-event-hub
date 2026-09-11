//Buat Folder.gs

function createMainAndSubfoldersCustom() {
  const parentFolderId = '14j7wEKHEiTwQYPW_peZJqJJMMEssIKYB'; // Ganti sesuai ID folder FILE PENDAFTARAN
  const mainFolderNames = ['Invoice', 'LoA', 'Registrasi Sukses'];

  const allSubfolderNames = ['indo-online', 'indo-offline', 'inter-online', 'inter-offline'];
  const invoiceSubfolderNames = ['indo-online','indo-offline', 'inter-online','inter-offline']; 

  const parentFolder = DriveApp.getFolderById(parentFolderId);

  mainFolderNames.forEach(mainName => {
    let mainFolder;
    const existingMain = parentFolder.getFoldersByName(mainName);

    if (existingMain.hasNext()) {
      mainFolder = existingMain.next();
      Logger.log('📁 Main folder already exists: ' + mainName);
    } else {
      mainFolder = parentFolder.createFolder(mainName);
      Logger.log('✅ Created main folder: ' + mainName);
    }

    const subfolderList = mainName === 'Invoice' ? invoiceSubfolderNames : allSubfolderNames;

    subfolderList.forEach(subName => {
      const existingSub = mainFolder.getFoldersByName(subName);
      if (!existingSub.hasNext()) {
        mainFolder.createFolder(subName);
        Logger.log('✅ Created subfolder: ' + subName + ' in ' + mainName);
      } else {
        Logger.log('⚠️ Subfolder already exists: ' + subName + ' in ' + mainName);
      }
    });
  });
}
