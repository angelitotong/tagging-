document.addEventListener("DOMContentLoaded", function(event) { 

    text = document.getElementById('output')
    op = document.getElementById('option')
    input = document.getElementById('input')
    user = prompt('>>>')

    function clear(){
        op.remove()
    }

    function names(alt){
        names = prompt('Names>>>')
        tagged = []
        list = ''
        nameList = names.split(',')
        etal = ''
        if(nameList.length >= 6){
            etal = '<etal/>'
        }
        for (let i = 0; i < nameList.length; i++){
            surname = []
            givennames = []
            author = nameList[i].trim().split(' ')
            for (let x = 0; x < author.length; x++){
                if(author[x].length > 1){
                    if (author[x][0] == author[x][0].toLowerCase() && author[x][1] == author[x][1].toLowerCase() && author[x][1] != '.'){
                        surname.push(author[x])
                    } else if (author[x][0] == author[x][0].toUpperCase() && author[x][1] == author[x][1].toLowerCase() && author[x][1] != '.'){
                        surname.push(author[x])
                    } else if (author[x][0] == author[x][0].toUpperCase() && author[x][1] == author[x][1].toLowerCase() && author[x][1] == '.'){
                        givennames.push(author[x])
                    } else if (author[x][0] == author[x][0].toUpperCase() && author[x][1] == author[x][1].toUpperCase()){
                        givennames.push(author[x])
                    }
                } else if (author[x].length == 1 && author[x][0] == author[x][0].toUpperCase()){
                    givennames.push(author[x])
                }
            }
            tagging(surname,givennames)
            clear()
        }

        function tagging(surname,givennames){
            surname = surname.toString()
            givennames = givennames.toString()
            tagged.push(`<name><surname>${surname.replace(',',' ')}</surname> <given-names>${givennames.replace(',',' ')}</given-names></name>`)
        }
        text.append(`${tagged.toString().replaceAll(',', '')}${etal}`)
        clear()
    }

    function DOI(){
        userInput = prompt('DOI ONLY >>> ')
        doiTag =  ` doi: <pub-id pub-id-type="doi">${userInput}</pub-id>`
        text.append(doiTag)
        clear()
    }

    function URI(){
        userInput = prompt('Link >>> ')
        http = ''
        if (!userInput.includes('http')){
            http = 'https://'
        }
        doiTag =  `<uri xlink:href="${http}${userInput}">${http}${userInput}</uri>`
        text.append(doiTag)
        clear()
    }

    function Page(){
        userInput = prompt('Fpage and Last Page(0), Page range(1), Elocation-id(2)>>> ')
        input = prompt('Page #>>>')
        input = input.split('-')
        x = input[0]
        y = input[1]
        output =''
        if(userInput == 0){
            output = `<fpage>${x}</fpage>&ndash;<lpage>${y}</lpage>`
        } else if(userInput == 1){
            output = `<page-range>${x}&ndash;${y}</page-range>`
        } else if(userInput == 2){
            output = `<elocation-id>${userInput}</elocation-id>`
        }
        text.append(output)
        clear()
    }

    function titleCase(){
        userInput = prompt('Article title>>>')
        text.append(userInput.toTitleCase())

    }


    if (user == 0){
        names()
    } else if(user == 1){
        DOI()
    } else if(user == 2){
        URI()
    } else if(user == 3){
        Page()
    } else if(user == 4){
        titleCase()
    }

});