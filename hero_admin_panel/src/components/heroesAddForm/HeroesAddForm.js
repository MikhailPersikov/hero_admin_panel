import React from 'react';
import {useHttp} from '../../hooks/http.hook';
import {useDispatch, useSelector} from 'react-redux';
import {heroesFetched,heroesFetching} from '../../actions/index';

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

let id = 4;

const HeroesAddForm = () => {

    // const {heroes,heroesLoadingStatus} = useSelector(state => state);
    const {request} = useHttp();
    const dispatch = useDispatch();

    const [hero, setHero] = React.useState([])
    
    const getHeroName = (e) => {
        const name = e.target.value;
        setHero({name})
    }

    const getHeroDescription = (e) => {
        const description = e.target.value
        setHero({...hero, description: description})
    }

    const getHeroElement = (e) => {

        const element = e.target.value
        setHero({...hero, element})
    }


    const getId = () => { 
        id++;
    }

    const showHero = () => {
        // getId()
        // setHero({...hero, wow: 33})
        const arr = {
                id: 123123,
                name: 'Spiderman',
                description: 'nothing',
                element: 'fire'
        }
         
        request("http://localhost:3001/heroes", "POST", JSON.stringify(arr))
            .then(res => console.log(res, 'Отправка успешна'))
            .then(dispatch(heroesFetched(hero)))
            .catch(err => console.log(err));
    }

    // const newHero = {
    //     id: 123123,
    //     name: 'Spiderman',
    //     description: 'nothing',
    //     element: 'fire'
    // }

    return (
        <form className="border p-4 shadow-lg rounded">
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    onChange={getHeroName}
                    placeholder="Как меня зовут?"/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    onChange={getHeroDescription}
                    style={{"height": '130px'}}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    onChange={getHeroElement}>
                    <option >Я владею элементом...</option>
                    <option value="fire">Огонь</option>
                    <option value="water">Вода</option>
                    <option value="wind">Ветер</option>
                    <option value="earth">Земля</option>
                </select>
            </div>

            <button 
                type="submit" 
                className="btn btn-primary" 
                onClick={showHero}
            >Создать</button>
        </form>
    )
}

export default HeroesAddForm;