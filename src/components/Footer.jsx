import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Footer = () => {
  return (
    <>
      <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
        <aside className=''>

          <p className='text-2xl text-blue-600 font-bold'>
            DevTinder
          </p>
          <p className='max-w-md'>
            DevTinder is a platform built for developers to connect, collaborate, and grow. Whether you’re looking for project partners, mentors, or career opportunities, DevTinder helps you build meaningful connections in the developer community.
          </p>
          
        </aside>
        <div className='w-full flex md:justify-end'>
          <div className=''>
            <p className='text-2xl mb-3'>
              Contact Me
            </p>
            <nav className=''>
              <li className='list-none mb-2'>
                <FontAwesomeIcon icon={faEnvelope} className='me-2' /><span className='font-[500] me-1'>Email:</span>
                <a href="mailto:tiwarideepanker@gmail.com" target='_blank'>
                  <span className='hover:underline'>tiwarideepanker@gmail.com</span>
                </a>
              </li>
              <li className='list-none mb-2'>
                <FontAwesomeIcon icon={faLinkedinIn} className='me-2' /><span className='font-[500] me-1'>Linkedin:</span>
                <a href="https://www.linkedin.com/in/deepanker-tiwari" target='_blank'>
                  <span className='hover:underline'>Deepanker Tiwari</span>
                </a>
              </li>
              <li className='list-none mb-2'>
                <FontAwesomeIcon icon={faGithub} className='me-2' /><span className='font-[500] me-1'>Github:</span>
                <a href="https://github.com/Deepanker200/" target='_blank'>
                  <span className='hover:underline'>Deepanker200</span>
                </a>
              </li>
            </nav>
          </div>
        </div>
        
      </footer>
      <p className='font-[500] text-sm text-center py-5'>
          © DevTinder | Made with ❤️ for Developers! 
          </p>
    </>
  )
}

export default Footer