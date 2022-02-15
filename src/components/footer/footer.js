import React from 'react';
import footer from './footer.module.css';
const Footer = () => {
    return (
        <div className={footer.container}>
            <div className={footer.subContainer}>
                <div className={footer.innerContainer}>
                    <div>
                        <p className={footer.Heading}>About Us</p>
                        <div className={footer.options}>
                            <p>About Us</p>
                            <p>Contact Us</p>
                            <p>{`Terms & Conditions`}</p>
                            <p>About Us</p>
                        </div>
                    </div>

                    <div >
                        <p className={footer.Heading}>Top 5 Shows</p>
                        <div className={footer.options}>
                            <p>Spiderman</p>
                            <p>Marvel Collection</p>
                            <p>DC Collection</p>
                        </div>
                    </div>

                </div>

                <div className={footer.innerContainer}>
                    <div >
                        <p className={footer.Heading}>Top 5 Providers</p>
                        <div className={footer.options}>
                            <p>Netflix</p>
                            <p>Hotstar</p>
                            <p>Prime Video</p>
                            <p>Zee</p>
                            <p>Sony Liv</p>
                        </div>
                    </div>

                    <div>
                        <p className={footer.Heading}>Social Account</p>
                        <div className={footer.options}>
                            <p>Facebook</p>
                            <p>Twitter</p>
                            <p>LinkedIn</p>
                            <p>Instagram</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
