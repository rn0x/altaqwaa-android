import React from 'react';
import QuranViewer from '../components/QuranViewer';
import pagesQuran from '../assets/json/pagesQuran.json'

export default function QuranPage() {
    return (
        <div>
            <QuranViewer pages={pagesQuran} />
        </div>
    )
}
