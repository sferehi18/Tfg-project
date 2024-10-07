function Navbar({placeHolder,size}){
    const styles = {
        small: { width: '6rem', height: '1.6rem', fontSize: '0.8rem' },
        large: { width: '35rem', height: '2rem', fontSize: '1rem' },
      };
    return(
        <input type="search" className="search-bar" style={styles[size]} placeholder={placeHolder}/>
    )
}

export default Navbar;
