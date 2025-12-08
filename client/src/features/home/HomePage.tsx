import DefaultButton from '../../components/buttons/DefaultButton'
import { Link } from 'react-router'

export default function HomePage() {
  return (
    <div className="text-center mt-10">
        <h1 className="text-3xl font-bold underline"> 
            Welcome to the Boundary Waters Fish Map!
        </h1>
        <p className="mt-4">
            Explore fishing spots, log your catches, and share your adventures in the beautiful Boundary Waters Canoe Area Wilderness.
        </p>
        <Link to="/map">
            <DefaultButton text="Open Map" />    
        </Link>
    </div>
  )
}
