import { faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ReactNode, useState } from 'react';


//{title, bgColor, children, searchBar=null}
type NavbarProps = {
  title:string;
  children: ReactNode;
  searchBar?: ReactNode | null;
  position?: "static" | "relative" | "absolute" | "fixed" | "sticky";
}
const NavBar: React.FC<NavbarProps> = ({title, children, searchBar=null, position="static"}) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav style={{position:position, top: "1px"}} className={`bg-secondary-400 p-4`}>
      <div className="container min-w-full flex justify-between items-center">
        {/* Logo o Título */}
        <div className="text-white text-xl font-bold">{title}</div>
        {/* Boton de Menú en dispositivos móviles */}
        <div className="md:hidden">
          <button
            onClick={handleToggleMenu}
            className="text-white focus:outline-none text-2xl"
          >
            {menuOpen ? (
               <FontAwesomeIcon icon={faClose} />
            ) : (
              <FontAwesomeIcon icon={faBars} />

            )}
          </button>
        </div>
        {/* Searchbar si es que hay */}
        {
            searchBar && 
            <div className='hidden md:block'>
                {searchBar}
            </div>
        }
        {/* Menú en dispositivos grandes */}
        <div className="hidden md:flex space-x-4">
            {children}
        </div>
      </div>
      {/* Menú desplegable en dispositivos móviles */}
      {menuOpen && (
        <div className="flex flex-col md:hidden mt-4">
            {children}
        </div>
      )}
    </nav>
  );
};

export default NavBar;
