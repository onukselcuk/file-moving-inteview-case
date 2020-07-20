//  Interfaces
interface File {
  id: string;
  name: string;
}

interface Folder {
  id: string;
  name: string;
  files: File[];
}

type List = Folder[];

// Function

/**
 * This function moves a file to another folder and
 * returns the new state of the given list of folders.
 * @param list An array of folders
 * @param source Source File ID
 * @param destination Target Folder ID
 */

export default function move(list: List, source: string, destination: string): List {
  const storedList: List = list;

  // Find the index of the source folder of the file that's going to be moved
  // in the array of list
  const sourceFolderIndex: number = storedList.findIndex((currentFolder) => {
    return currentFolder.files.some((currentFile) => currentFile.id === source);
  });

  // If source file doesn't exist, throw an error, because it means the id belongs to a folder
  if (sourceFolderIndex === -1) throw new Error('You cannot move a folder');

  // Find the index of the destination folder where the file will be moved to.
  const targetFolderIndex: number = storedList.findIndex(
    (currentFolder) => currentFolder.id === destination,
  );

  // If target folder index doesn't exist, throw an error, because it means the id belongs to a file
  if (targetFolderIndex === -1) throw new Error('You cannot specify a file as the destination');

  // If there is no error, we can move forward
  // Find the source file that's going to be moved
  const sourceFile = storedList[sourceFolderIndex].files.filter(
    (currentFile) => currentFile.id === source,
  )[0];

  // Add source file to destination folder
  storedList[targetFolderIndex].files.push(sourceFile);

  // Remove source file from source folder
  storedList[sourceFolderIndex].files = storedList[sourceFolderIndex].files.filter(
    (current) => current.id !== source,
  );

  return storedList;
}
