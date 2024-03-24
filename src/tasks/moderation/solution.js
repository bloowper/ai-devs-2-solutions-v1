import OpenAI from 'openai';


exports.resolve = async function(taskContent) {
    const openai = new OpenAI();
    const moderation = await openai.moderations.create({ input: "I want to kill them." });

    console.log(moderation);
    return "TODO"
};
