import React, {useState} from 'react';

import '../node_modules/react-vis/dist/style.css';

import {
    XYPlot,
    XAxis,
    YAxis,
    VerticalGridLines,
    HorizontalGridLines,
    CustomSVGSeries,
    Highlight,
    Borders,
    DecorativeAxis,
    Hint
} from 'react-vis';

export default function CustomSVGRootLevelComponent(props) {

    const [lastDrawLocation, setLastDrawLocation] = useState(null);
    const [hover, setHover] = useState(true);
    const [hoveredCell, setHoveredCell] = useState(false);

    const customComponent = (row, positionInPixels) => {
        return (
            <g className="inner-inner-component">
                <circle cx="0" cy="0" r={3} fill="green" />
                <svg>
                    <image href={row.url} width={80}/>
                </svg>

                {/*<circle cx="0" cy="0" r={row.size || 10} fill="green" />*/}
                {/*<ReactLogo/>*/}
                {/*<text x={0} y={0}>*/}
                {/*    <tspan x="0" y="0">{`x: ${positionInPixels.x}`}</tspan>*/}
                {/*    <tspan x="0" y="1em">{`y: ${positionInPixels.y}`}</tspan>*/}
                {/*</text>*/}
            </g>
        );
    }

    return (
        <React.Fragment>
            <XYPlot width={800} height={800}
                    animation
                    xDomain={
                        lastDrawLocation && [
                            lastDrawLocation.left,
                            lastDrawLocation.right
                        ]
                    }
                    yDomain={
                        lastDrawLocation && [
                            lastDrawLocation.bottom,
                            lastDrawLocation.top
                        ]
                    }
            >

                <VerticalGridLines/>
                <HorizontalGridLines />
                <Highlight
                    // drag
                    onBrushEnd={area => setLastDrawLocation(area)}
                    onDrag={area => {
                        setHover(false);
                        setLastDrawLocation({
                            bottom: lastDrawLocation.bottom + (area.top - area.bottom),
                            left: lastDrawLocation.left - (area.right - area.left),
                            right: lastDrawLocation.right - (area.right - area.left),
                            top: lastDrawLocation.top + (area.top - area.bottom)}
                        )
                    }}
                    onDragEnd={() => setHover(true)}
                />
                <CustomSVGSeries
                    // className="custom-marking"
                    data={[
                        {x: 0, y: 0, size: 0},
                        {x: 5, y: 20, size: 0},
                        {x: 1, y: 10, size: 3, url: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/1280px-Google_2015_logo.svg.png", customComponent},
                        {x: 1.7, y: 12, size: 20, url: "https://img.pngio.com/fileslack-technologies-logosvg-wikimedia-commons-slack-logo-png-1280_326.png", customComponent},
                        {x: 2, y: 5, url: "data:image/png;base64,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" ,customComponent},
                        {x: 3, y: 15, url: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png",customComponent},
                        {x: 2.5, y: 7, url: "https://logos-download.com/wp-content/uploads/2016/06/Disney_logo.png", customComponent}
                    ]}
                    onValueMouseOver={ v => hover && setHoveredCell(v)}
                    onValueMouseOut={v => setHoveredCell(false)}
                />
                {hover && hoveredCell && (
                    <Hint value={hoveredCell}></Hint>
                )}
                <Borders style={{
                    all: {fill: "white", opacity: 1},
                }} />
                <XAxis />
                <YAxis />
                {/*<DecorativeAxis*/}
                {/*    axisStart={{x: 0, y: 0}}*/}
                {/*    axisEnd={{x: 1, y: 1}}*/}
                {/*    axisDomain={[-10, 100]}*/}
                {/*/>*/}
            </XYPlot>
            <button onClick={() => setLastDrawLocation(null)}>Reset</button>
        </React.Fragment>
    );
}
