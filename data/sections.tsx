import styles from '../styles/Home.module.scss'

export interface Button {
  name: string;
  func: string;
  params: Array<unknown>;
}

interface SectionDataType {
  name?: string | undefined;
  content: JSX.Element;
  buttons: Array<Button>
}

const homeBtn: Button = {
  name: 'home',
  func: 'navigate',
  params: [0]
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
      [1], [2], [3], [4], [5]
    ])
  },
  {
    name: 'Projects',
    content: (<>

    </>),
    buttons: createButtons([
      'intune', 'mashsong', 'typetrainer', 'ledcontrol', 'next'
    ], 'navigate', [
      [1], [2], [3], [4], [2]
    ])
  },
  {
    name: 'Experience',
    content: (<>

    </>),
    buttons: createButtons([
      'boeing', 'asu research', 'natural langauge', 'computer vision', 'next'
    ], 'navigate', [
      [1], [2], [3], [4], [3]
    ])
  },
  {
    name: 'About',
    content: (<>

    </>),
    buttons: createButtons([
      'who i am', 'where im from', 'my passions', 'my dreams', 'next'
    ], 'navigate', [
      [1], [2], [3], [4], [4]
    ])
  },
  {
    name: 'Contact',
    content: (<>

    </>),
    buttons: createButtons([
      'github', 'linkedin', 'email', 'leave a message', 'next'
    ], 'navigate', [
      [0], [1], [2], [3], [4], [5]
    ])
  },
]
