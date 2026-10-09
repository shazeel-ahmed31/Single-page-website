(function(root){
function createThemeState(storage,systemDark){
 let saved;let storageUnavailable=false;try{saved=storage.getItem('business-theme');}catch{storageUnavailable=true;}
 let explicit=saved==='dark'||saved==='light';let theme=explicit?saved:systemDark?'dark':'light';
 return {get theme(){return theme;},get explicit(){return explicit;},get storageUnavailable(){return storageUnavailable;},choose(value){if(value!=='dark'&&value!=='light')throw new Error('Invalid theme');theme=value;explicit=true;try{storage.setItem('business-theme',value);storageUnavailable=false;}catch{storageUnavailable=true;}return theme;},systemChanged(dark){if(!explicit)theme=dark?'dark':'light';return theme;}};
}
if(typeof module!=='undefined')module.exports={createThemeState};else root.ThemeState={createThemeState};
})(globalThis);
