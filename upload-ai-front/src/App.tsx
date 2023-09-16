import { FileVideo, Github, Upload, Wand2 } from "lucide-react";
import { Button } from "./components/ui/button";
import { Separator } from "@radix-ui/react-separator";
import { Textarea } from "./components/ui/textarea";
import { Label } from '@radix-ui/react-label';
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue, } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export function App() {
  return (
    <>
      <div className="min-h-screen flex flex-col">
        <div className="px-6 py-3 flex items-center justify-between border-b">
          <h1 className="text-xl font-bold">Upload AI</h1>

          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              Desenvolvido com ❤️ Ghalba Vieira
            </span>
          
            <Separator orientation="vertical" className="h-6" />

            <Button variant="outline">
                <Github className="w-4 h-4 m-2">Github</Github>
            </Button>
          </div>
        </div>

        <main className="flex-1 p-6 flex gap-6">
          <div className="flex flex-col flex-1 gap-4">
            <div className="grid grid-rows-2 gap-4 flex-1">
              <Textarea 
                className="resize-none p-4 leading-relaxed"
                placeholder="Inclua o prompt para a IA...">
              </Textarea>
              <Textarea 
                className="resize-none p-4 leading-relaxed"
                placeholder="Resultado gerado pela IA...">
              </Textarea>
            </div>
          <p className="text-sm text-muted-foreground">
            Lembre-se: Voce pode utilizar variável <code className="text-orange-700 ">{'Transcription'}</code> no seu prompt para adicionar o conteúdo da transcrição do video selecionado
            </p>
          </div>
          <aside className="w-80 space-y-4">
            <form className="space-y-6">
                <label 
                  htmlFor="video" 
                  className="p-5 cursor-pointer border flex rounded-md aspect-video border-dashed text-sm justify-center gap-2 items-center text-muted-foreground hover:bg-primary/10">
                  <FileVideo className="w-4 h-4"/>
                  Selecione um Video
                </label>

                <input type="file" id="video" accept="video/mp-4" className="sr-only"/>

                <Separator />

                <Label 
                  htmlFor="transcription_prompt">
                    Prompt de Transcrição
                </Label>
                <Textarea 
                  id="transcription_prompt" 
                  className="min-h-20 leading-relaxed"
                  placeholder="Inclua palavras-chave mencionadas no video separadas por vírgula (,)"/>

                <Button type="submit" className="w-full">
                  Carregar Video 
                  <Upload className="w-4 h-4 ml-2"/>
                </Button>
              </form>
              <Separator />

              <form className='space-y-6'>
              <div className='space-y-2'>
                  <Label>Prompt</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um prompt..."/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="value-3">value</SelectItem>
                      <SelectItem value="value">value</SelectItem>
                      <SelectItem value="value">value</SelectItem>
                    </SelectContent>
                  </Select>
              </div>

              <div className='space-y-2'>
                <Label>Modelo</Label>
                <Select disabled defaultValue='gpt-3'>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="gpt-3">GPT 3.5-turbo 16k</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                    <SelectItem value="system">System</SelectItem>
                  </SelectContent>
                </Select>
                <p className='block text-xs text-muted-foreground italic'>Você poderá customizar essa opção em breve!</p>
              </div>

              <Separator/>

              <div className='space-y-4'>
                <Label>Temperatura</Label>
                <Slider>
                  min={0}
                  max={1}
                  stop={0.1}
                </Slider>
                <span className='block text-xs text-muted-foreground italic'>
                  Valores mais altos tendem a deixar o resultado mais criativo e com possiveis erros.
                </span>
              </div>
              <Separator/>

              <Button type='submit' className='w-full'>Executar
              <Wand2 className='w-4 h-4 ml-2'/>
              </Button>
            </form>
          </aside>
        </main>
      </div>
    </>
  )
}


