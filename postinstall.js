import path from "path";
import fse from "fs-extra";
import process from 'process';


const topDir = process.env.INIT_CWD;

// Hedef dizin (kütüphanenin kurulduğu projenin public/media dizini)
const targetDirMedia = path.join(topDir, 'public/media');
const targetDirTinyMCE = path.join(topDir, 'public/tinymce');


// Hedef dizini temizle
fse.emptyDirSync(targetDirTinyMCE);

if(fse.pathExistsSync(path.join(topDir, "node_modules", "tinymce"))){
	// Sembolik bağlantıları takip ederek kopyalama işlemi
	fse.copySync(
	  path.join(topDir, "node_modules", "tinymce"),
	  targetDirTinyMCE,
	  { dereference: true, overwrite: true }
	);
}


if(fse.pathExistsSync(path.join(topDir, "node_modules", "@unlembilisim", "node-frontend-engine", "dist", "media"))){

	// Sembolik bağlantıları takip ederek kopyalama işlemi
	fse.copySync(
	  path.join(topDir, "node_modules", "@unlembilisim", "node-frontend-engine", "dist", "media"),
	  targetDirMedia,
	  { dereference: true, overwrite: true }
	);	
}

if(fse.pathExistsSync(path.join(topDir, "node_modules", "@unlembilisim/node-frontend-engine", "dist", "media"))){

	// Sembolik bağlantıları takip ederek kopyalama işlemi
	fse.copySync(
	  path.join(topDir, "node_modules", "@unlembilisim/node-frontend-engine", "dist", "media"),
	  targetDirMedia,
	  { dereference: true, overwrite: true }
	);	
}
