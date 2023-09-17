import { fastify } from 'fastify'
import { prisma } from './lib/prisma'
import { getAllPromptsRoute } from './routes/get-all-prompts'
import { uploadVideoRoute } from './routes/upload-video'
import { createTranscriptionRoute } from './routes/create-transcription'
import { generateAiCompleteRoute } from './routes/generate-ai-completion'
import { fastifyCors } from '@fastify/cors'


const app = fastify()

// url do front end
app.register(fastifyCors), {
    origin: '#',
}


app.register(getAllPromptsRoute)
app.register(uploadVideoRoute)
app.register(createTranscriptionRoute)
app.register(generateAiCompleteRoute)

app.listen({
    port: 5555,
}).then(()=> {
    console.log('HTTP SERVER RUNNING')
})