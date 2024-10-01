const {v2} = require("../cloudinary");
const moment = require("moment");
const fs = require("fs");

const userProfilePostController = async (req, res) => {
   const { name } = req.body;
    const uploadResult = await v2.uploader.upload(req.file.path);
    // console.log("file name:", req.file.filename);
    fs.unlinkSync(`${req.file.path}`);

    // console.log("uploadResult:", uploadResult);

    try {
        const date = moment(new Date()).format("YYYY-MM-DD");

        // const newUser = new User({
        //     name,
        //     img: uploadResult.secure_url,
        //     imgId: uploadResult.public_id,
        //     date,
        // });


        // await newUser.save();
        res.status(200).json({ success: "User details saved to db successfully" });
    } catch (err) {
        res.status(500).json({ error: "Error in adding user to db" });
    }
}

module.exports =  { userProfilePostController };