import Image from 'next/image'
import MusicSVG from './assets/headset.svg'
import ReadSVG from './assets/auto_stories.svg'
import SportSVG from './assets/fitness_center.svg'
import RestaurantSVG from './assets/restaurant.svg'
import MeditationSVG from './assets/self_improvement.svg'
import WindSVG from './assets/wind.svg'
import ImageSVG from './assets/image.svg'
import VideoSVG from './assets/video.svg'
import AudioSVG from './assets/audiotrack.svg'
import CategorySVG from './assets/category.svg'

interface IconsProps {
  name?: string;
}

export function Icons({ name }: IconsProps){
  switch(name) {
    case 'Musica':
      return <Image src={MusicSVG} height={32} width={32} alt={`icone de ${name}`}/>
    
    case 'Esporte':
      return <Image src={SportSVG} height={32} width={32} alt={`icone de ${name}`}/>

    case 'Respiracao':
      return <Image src={WindSVG} height={32} width={32} alt={`icone de ${name}`}/>

    case 'Meditação':
      return <Image src={MeditationSVG} height={32} width={32} alt={`icone de ${name}`}/>

    case 'Leitura':
      return <Image src={ReadSVG} height={32} width={32} alt={`icone de ${name}`}/>

    case 'Alimentação':
      return <Image src={RestaurantSVG} height={32} width={32} alt={`icone de ${name}`}/>

    case 'Category':
      return <Image src={CategorySVG} height={32} width={32} alt={`icone de ${name}`}/>
    
    case "jpg":
    case "jpeg":
    case 'png':
      return <Image src={ImageSVG} height={32} width={32} alt={`icone de ${name}`}/>

    case 'mp4':
      return <Image src={VideoSVG} height={32} width={32} alt={`icone de ${name}`}/>
    
    case 'mp3':
      return <Image src={AudioSVG} height={32} width={32} alt={`icone de ${name}`}/>

    default: return <div/>
  }
}