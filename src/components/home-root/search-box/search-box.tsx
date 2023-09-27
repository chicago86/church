import classNames from "classnames"
import React, { useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { getVariables } from "../../../utils";
import magnifier from './images/magnifier.svg'
import s from './search-box.module.scss'

const SearchBox: React.FC = () => {
  const [searchString, setSearchString] = useState<string | undefined>(undefined)
  const [updateTrigger, setUpdateTrigger] = useState(uuidv4())

  const isSearchResult = () => searchString

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => setSearchString(event.target.value)

  const capitalize = (s: string | null | undefined) => s ? s.charAt(0).toUpperCase() + s.slice(1) : ''

  const submit = (p_vacancy: string | null | undefined) => {
    setUpdateTrigger(uuidv4())
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    submit(searchString)
  }

  const onClear = () => {
    setSearchString(undefined)
    submit(undefined)
  }

  return isSearchResult()
    ? <div className={s.container}>
      <h2 className={s.heading}>{capitalize(searchString)}</h2>
      <button className={s.clearButton} onClick={onClear} />
    </div>
    : <form onSubmit={onSubmit} className={classNames(s.container, s.floatAboveEverything)}>
      <div className={s.root}>
        <button className={s.iconButton} type='submit' onClick={onSubmit} >
          <img src={magnifier} alt="search" />
        </button>
        <input
          className={classNames(s.input)}
          value={searchString ?? ''}
          onChange={onChange}
          placeholder={'Search'}
        />
      </div>
    </form >
}

export default SearchBox
