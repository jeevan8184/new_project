
import newUser from "./user";

import { model,models,Schema } from "mongoose";

const PromptSchema=new Schema({
    creator:{
        type:Schema.Types.ObjectId,
        ref:'newUser'
    },
    prompt:{
        type:String,
        required:[true,'prompt is required']
    },
    tag:{
        type:String,
        required:[true,'tags is required']
    }
})

const Prompt=models.Prompt || model('Prompt',PromptSchema);

export default Prompt;


