import multer from "multer"
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "./productImages")
    },
    filename: function (req, file, cb) {
      const splitted=file.originalname.split(".")
      const extension=splitted[splitted.length-1]
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, `${file.fieldname}-${uniqueSuffix}.${extension}`)
    }
  })
  
 const upload = multer({
     storage,
    })
export {upload}