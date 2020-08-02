import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import styled from 'styled-components';

class Rules extends Component {
    render() {
        return (
            <GlobalStyle>
                <Navbar/>
                <h2>Zasady</h2>
                <StyledParagraph>
                    Przed przystąpieniem do jakiegokolwiek biznesu, a w szczególności internetowego, pamiętaj o dokonaniu oceny swoich możliwości finansowych, wszystko przeczytaj i przeanalizuj. Treść artykułów, wszelkich tekstów, prezentacji, nagrań audio i video w domenie i subdomenach: twojerabaciki.pl mają wyłącznie charakter informacyjno-edukacyjny. Strona, którą przeglądasz nie jest poradnikiem inwestycyjnym w rozumieniu Rozporządzenia Ministra Finansów z dnia 19 października 2005 r. w sprawie informacji stanowiących rekomendacje dotyczące instrumentów finansowych, lub ich emitentów (Dz. U. z 2005 r. Nr 206, poz. 1715). Pamiętaj, że żaden sposób na zarabianie pieniędzy nie daje nigdy 100% gwarancji zarobku i od nas tej gwarancji również nie otrzymasz.
                    Strona twojerabaciki.pl jest wyrazem naszych osobistych poglądów. Nie ponosimy odpowiedzialności za decyzje podjęte przez czytelników na podstawie informacji zawartych na stronie oraz wysyłkach mailowych z adresu kontakt@twojerabaciki.pl. Każdy biznes wiąże się z ryzykiem, a osoba decydująca się na przystąpienie do któregoś z opisywanych programów decyzje podejmuje sama i na własną odpowiedzialność.
                    Zgodnie z powyższym autor nie ponosi jakiejkolwiek odpowiedzialności za decyzje inwestycyjne podejmowane na podstawie treści zawartych w materiale jak i jakichkolwiek materiałach instruktażowych.
                    Zarabianie i pomnażanie pieniędzy (inwestycje: nieruchomości, giełda papierów wartościowych, giełdy walutowe, kryptowaluty, biznesy typu START-UP, forex, lokaty bankowe, fundusze inwestycyjne i każdy inny rodzaj inwestycji) wiąże się z ryzykiem utraty części lub całości zainwestowanego kapitału.
                    Decyzje o dokonaniu jakiejkolwiek inwestycji podejmuj samodzielnie.
                    Wykorzystanie pieniędzy, których utrata spowodowałaby drastyczne pogorszenie stanu domowego budżetu, zmiany standardu życia lub kłopoty finansowe, jest stanowczo odradzane.
                </StyledParagraph>
            </GlobalStyle>
        )
    }
}

const GlobalStyle = styled.div`
    &, &::before, &::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

     h2 {
         margin: 2rem;
     }
`

const StyledParagraph = styled.p`
    font-size: 0.9rem;
    line-spacing: 0.9rem;
    margin: 2rem;
`

export default Rules;