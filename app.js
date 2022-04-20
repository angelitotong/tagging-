document.addEventListener("DOMContentLoaded", function(event) {
    text = document.getElementById('output')
    op = document.getElementById('option')
    
    user = prompt('>>> ')

    function clear(){
        op.remove()
    }

    function names(alt){
        userInput = prompt('NAMES >>> ')
        inputSplit = userInput.split(',')
        run = 0
        tagged = []
        for (let index = 0; index < inputSplit.length; index++) {
            nameList = inputSplit[index].trim().split(',')
            author = nameList[0].toString().split(' ')
            space = author.length;
            nameTags = ''
            if (space == 3){
                nameTags = `<name><surname>${author[0]} ${author[1]}</surname> <given-names>${author[2]}</given-names></name>`
            } else if (space == 2){
                nameTags = `<name><surname>${author[0]}</surname> <given-names>${author[1]}</given-names></name>`
            }
            tagged.push(nameTags)
            out = tagged.toString()
            output = out.replaceAll(',','')
            run++
            etal = ''
            if (run == inputSplit.length){
                if (alt){
                    if (run >= 6){
                        etal ='<etal/>'
                    }
                    text.append(`<person-group person-group-type="author">${output}${etal}</person-group>\n`)
                }else{
                    if (run >= 6){
                        etal ='<etal/>'
                    }
                    text.append(`${output}${etal}\n`)
                }
                
            }
        }
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
        input = prompt('>>>')
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


    if (user == 0){
        alt = false
        names(alt)
    } else if(user == 1){
        alt = true
        names(alt)
    } else if(user == 2){
        DOI()
    } else if(user == 3){
        URI()
    } else if(user == 4){
        Page()
    }

});