import multer from "multer"
import express from "express"
import path from "path"
import {dirname} from "path"
import { fileURLToPath } from "url"


const _filename = fileURLToPath(import.meta.url);
const __dirname = dirname(_filename);
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,"..","productImages"))
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
// 