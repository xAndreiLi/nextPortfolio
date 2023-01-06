import styles from '../styles/Home.module.scss'

export interface Button {
  name: string;
  func: string;
  params: unknown;
}

interface SectionDataType {
  name?: string | undefined;
  content: JSX.Element;
  buttons: Array<Button>
}

const homeBtn: Button = {
  name: 'home',
  func: 'navigate',
  params: ['home']
}
const nextBtn: Button = {
  name: 'next',
  func: 'navigate',
  params: ['next']
}

const createButtons = (names:Array<string>, 
  func: string, pList: Array<Array<any>>) => {
    const buttonList = []
    for (let i = 0; i < names.length; i++){
      const button: Button = {
        name: names[i],
        func: func,
        params: pList[i]
      }
      buttonList.push(button)
    }
    return [homeBtn, ...buttonList]
}

export const sectionData: Array<SectionDataType> = [
  {
    content: (<>
      <h1 className={styles.scrollIn}>Andrei Li</h1>
      <div className={styles.fadeIn}>
        <p>Designer | Researcher | Musician</p>
      </div>
    </>),
    buttons: createButtons([
      'projects', 'experience', 'about', 'contact', 'blog'
    ], 'navigate', [
      [0], [1], [2], [3], [4], [5]
    ])
  },
  {
    name: 'projects',
    content: (<>

    </>),
    buttons: createButtons([
      'intune', 'mashsong', 'typetrainer', 'ledcontrol', 'next'
    ], 'navigate', [
      [0], [1], [2], [3], [4], [5]
    ])
  },
  {
    name: 'experience',
    content: (<>

    </>),
    buttons: createButtons([
      'projects', 'experience', 'about', 'contact'
    ], 'navigate', [
      [0], [1], [2], [3], [4], [5]
    ])
  },
  {
    name: 'about',
    content: (<>

    </>),
    buttons: createButtons([
      'projects', 'experience', 'about', 'contact'
    ], 'navigate', [
      [0], [1], [2], [3], [4], [5]
    ])
  },
  {
    name: 'contact',
    content: (<>

    </>),
    buttons: createButtons([
      'projects', 'experience', 'about', 'contact'
    ], 'navigate', [
      [0], [1], [2], [3], [4], [5]
    ])
  },
]
