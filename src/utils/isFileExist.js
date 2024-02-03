import { access} from 'fs/promises'

export const isFileExist = async (path, cb) =>{
	try {
		await access(path);
		cb()
		return;
	} catch {
	}
}