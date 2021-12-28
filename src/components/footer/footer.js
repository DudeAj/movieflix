import React from 'react';
import footer from './footer.module.css';
import { NavLink } from 'react-router-dom';
const Footer = () => {
    return (
        <div className={footer.container}>
            <div className={footer.subContainer}>
                <div className={footer.innerContainer}>
                    <div>
                        <p className={footer.Heading}>Top 5 Movies</p>
                        <div>
                            <p>Top 5 Movies</p>
                        </div>
                    </div>

                    <div >
                        <p className={footer.Heading}>Top 5 Shows</p>
                        <div>
                            <p>Top 10 Shows</p>
                        </div>
                    </div>

                </div>

                <div className={footer.innerContainer}>
                    <div >
                        <p className={footer.Heading}>Top 5 Providers</p>
                        <div>
                            <p>Top 10 Movies</p>
                        </div>
                    </div>

                    <div>
                        <p className={footer.Heading}>Top 5 new on provider</p>
                        <div>
                            <p>Top 5 Movies</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer
