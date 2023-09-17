import { FastifyInstance } from "fastify/types/instance";
import { prisma } from "../lib/prisma";
import { createReadStream } from "node:fs";
import { z } from 'zod';
import { openai } from "../lib/openai";
import path from 'path';

export async function createTranscriptionRoute(app: FastifyInstance) {
    app.post('/videos/:videoId/transcription', async (req) => {
        const paramsSchema = z.object({
            videoId: z.string().uuid(),
        })

        const { videoId } = paramsSchema.parse(req.params)

        const bodyschema = z.object({
            prompt: z.string(),
        })

        const { prompt } = bodyschema.parse(req.body)

        const video = await prisma.video.findUniqueOrThrow({
            where: {
                id: videoId,
            }
        })

        const videoPath = video.path
       // const audioReadStream = createReadStream(videoPath);
        const normalizedAudioPath = videoPath.replace(/\\/g, '/'); // Substitui as barras invertidas por barras normais no caminho

        const audioReadStream = createReadStream(normalizedAudioPath);

        const response = await openai.audio.transcriptions.create({
            file: audioReadStream,
            model: 'whisper-1',
            language: 'pt',
            response_format: 'json',
            temperature: 0,
            prompt,
        })
            
        const transcription = response.text

        await prisma.video.update({
            where: {
                id: videoId,
            },
            data: {
                transcription,
            }
        })

        return {transcription}
        // return {
        //     videoId,
        //     prompt,
        //     videoPath
        // }
        
    })
}