import * as React from "react"

function SvgComponent(props) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="3.5cm"
      height="6cm"
      viewBox="0 0 3500 6000"
      shapeRendering="geometricPrecision"
      textRendering="geometricPrecision"
      imageRendering="optimizeQuality"
      fillRule="evenodd"
      clipRule="evenodd"
      {...props}
    >
      <defs>
        <style>
          {
            ".prefix__str2{stroke:#05f719;stroke-width:50}.prefix__fil2{fill:none}.prefix__fil0{fill:#1505a1}.prefix__fil3{fill:#fefefe;fill-rule:nonzero}"
          }
        </style>
      </defs>
      <g id="prefix__\u0421\u043B\u043E\u0439_x0020_1">
        <g id="prefix___318144536">
          <path
            className="prefix__fil0"
            stroke="#b2b3b3"
            strokeWidth={75}
            d="M296 246l9 5534h2023l944-3944L2243 271z"
          />
          <path className="prefix__fil0" d="M2739 4063l230-961H339v961z" />
          <path
            fill="#2b2a29"
            stroke="#b2b3b3"
            strokeWidth={7.62}
            d="M339 3104h2633l-230 960H339z"
          />
          <path
            className="prefix__fil2 prefix__str2"
            d="M1336 3588l-298 172-298 172v-688l298 172zM2326 3588l-298 172-298 172v-688l298 172z"
          />
          <path
            className="prefix__fil3"
            d="M717 2889V746h694c263 0 434 10 514 32 123 32 226 102 308 210 83 108 125 247 125 417 0 132-24 242-72 332s-108 160-181 212c-74 51-148 84-224 101-104 20-253 31-448 31h-282v808H717zm434-1781v611h236c170 0 284-12 341-34 57-23 102-58 135-106 32-48 49-103 49-167 0-78-23-143-69-194s-103-83-173-95c-52-10-155-15-311-15h-208zM1116 5145v108H709c4-41 17-80 39-116 22-37 66-86 131-146 52-49 84-82 96-99 16-24 24-48 24-72 0-26-7-46-21-59-14-14-33-21-57-21-25 0-44 7-58 22-14 14-23 38-25 72l-116-11c7-64 29-110 65-138s82-42 136-42c60 0 107 16 142 49 34 32 51 72 51 120 0 28-5 54-15 78-10 25-25 51-46 78-14 18-40 44-77 78-36 33-60 56-69 67-10 11-18 22-24 32h231zm306 108v-122h-248v-101l263-386h97v385h76v102h-76v122h-112zm0-224v-207l-139 207h139zm382-383v225c38-45 83-67 136-67 27 0 51 5 72 15 22 10 38 22 49 38 11 15 19 32 23 51s6 48 6 87v258h-116v-232c0-46-2-75-7-88-4-12-12-22-24-29-11-7-25-11-42-11-20 0-37 5-52 14-16 9-27 23-34 42s-11 47-11 84v220h-116v-607h116z"
          />
        </g>
      </g>
    </svg>
  )
}

export default SvgComponent
