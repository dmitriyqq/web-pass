import React from 'react'
import {Text} from "../components/Text";
import {Paper} from "../components/Paper";

export const AboutPage: React.FC = () => {
    return <div>
        <Text variant='hightlight'>Контакты</Text>
        <Paper style={{ margin: '15px'}}>
            <a href="mailto:dmitrii.shulaikin@outlook.com"><Text variant='regular'>dmitrii.shulaikin@outlook.com</Text></a>
        </Paper>
        <Text variant='hightlight'>Описание сайта</Text>
        <Paper style={{ margin: '15px'}}>
            <Text variant='regular'>Сайт выполнен как курсовая работа по дисциплине "ПрЧМИ"</Text>
        </Paper>
        <Text variant='hightlight'>Задание</Text>
        <Paper style={{ margin: '15px'}}>
            <Text variant='small'>
                Вариант 7. Разработать визуальный компонент, реализующий элемент ”ListView”.
                <ul>
                    <li>Компонент должен обладать возможностью добавления, удаления и выделения элемента.</li>
                    <li>Компонент должен обладать возможностью изменения цвета текста и фона.</li>
                    <li>Для легенды хранить статистику о последовательности обращений
                        к визуальным элементам, привязанную к дате и времени.</li>
                </ul>
            </Text>
        </Paper>
    </div>;
}