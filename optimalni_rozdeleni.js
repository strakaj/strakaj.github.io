function norm2(V, W){
    var d = 0;
    
    for (let i = 0; i < V.length; i++) {
      d += Math.pow(V[i]-W[i], 2)
    }
    return Math.sqrt(d)
}


function dist(V, W, n, m){
var alpha = 1;
var sim = 1;
var su = 0;/*
for (let i = 0; i < V.length; i++) {
    if(V[i] == W[i] && V[i] == 1)
    sim += 1
    su += V[i] + W[i];
}*/


for (let i = 0; i < V.length; i++) {
    sim += (V[i] - W[i])*(V[i] - W[i]);
    su += V[i] + W[i];
}
sim = 1/Math.sqrt(sim);


return 1/(( (Math.abs(n - m) + 1)/(sim*alpha) ) * (su)) ;

}

function minimum(arr){
    min = Number.MAX_VALUE;
    ind = -1;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] < min){
            min = arr[i];
            ind = i;
        }
    }
    return [min, ind]
}


function optimalni_jidelnicek(jidla){
    var V = new Array(jidla.length)
    for (let j = 0; j < jidla.length; j++) {
        var v = new Array(suroviny_data.length)
        
        for (let i = 0; i < suroviny_data.length; i++) {
            if(jidla[j].suroviny.includes(suroviny_data[i].nazev)){
                v[i] = 1;
                var ind = jidla[j].suroviny.indexOf(suroviny_data[i].nazev)
                v[i] = jidla[j].mnozstvi[ind];
                
            }
            else{
                v[i] = 0;
            }
            
        }
        V[j] = v;
        
    }
    console.log(dist(V[0], V[1], 0, 1))
    console.log(dist(V[0], V[1], 0, 2))
    console.log(dist(V[1], V[1], 0, 3))

    
    /*
    var v2 = [0, 0, 1];
    var v3 = [0, 1, 0];
    var v4 = [0, 1, 1];
    var v5 = [1, 0, 0];
    var v6 = [1, 0, 1];
    var v7 = [1, 1, 0];
    var v8 = [1, 1, 1];*/
    
    /*var V = [v2, v3, v4, v5, v6, v7, v8];*/
    
    
    /*V = [[0,1], [1,1]];*/
    var days = pocet_dnu;
    
    //inicializace ceny
    var coast = new Array(days);
    for (let i = 0; i < days; i++) {
        coast[i] = new Array( V.length );
        for (let j = 0; j < V.length; j++){
            r = Math.random();
            coast[i][j] = {'cumulative' : r, 'previus_ind' : -1}
        }
    }
    
    //vypocet ceny sousednich
    var W = new Array(V.length);
    for (let i = 0; i < V.length; i++) {
        W[i] = new Array(V.length);
        for (let j = 0; j < V.length; j++) {
            W[i][j] = dist(V[i], V[j], 0, 1);
        }
    }
    console.log(W);
    //viterbi vypocet ceny
    for (let d = 1; d < days; d++) {
        for (let i = 0; i < V.length; i++) {
            var S = new Array(V.length); //vsechny sumy pro tento krok
            for (let j = 0; j < V.length; j++) {
                S[j] = W[i][j] + coast[d-1][j]['cumulative'];
                
                if(d >= 2){
                    for (let d_prev = d-1; d_prev > 0; d_prev--){
                        S[j] = S[j] + dist(V[i], V[coast[d_prev][j]['previus_ind']], d, d_prev);
                    }
                }
                
            }
            
            var min_ind = minimum(S);
            coast[d][i]['cumulative'] = min_ind[0];
            coast[d][i]['previus_ind'] = min_ind[1];
        }
    }
    
    //zpetny pruchod
    var last_day_coast = coast[days-1];
    var c = new Array( V.length );
    for (let i = 0; i < last_day_coast.length; i++) {
        c[i] = last_day_coast[i]['cumulative']
    }
    var min_ind = minimum(c);
    var jidla_ind = new Array( V.length );
    jidla_ind[days-1] = min_ind[1];
    
    for(let i = days-2; i >= 0; i--){
        jidla_ind[i] = coast[i+1][jidla_ind[i+1]]['previus_ind']
    }
    
    //vypis jidel
    for (let i = 0; i < jidla_ind.length; i++) {
        //console.log(jidla_ind[i], V[jidla_ind[i]])
    }
    //console.log(jidla_ind);
    
    
    


    console.log(coast);
    var jidla_jidelnicek = new Array()
    for (let i = 0; i < jidla_ind.length; i++) {
        jidla_jidelnicek.push(jidla[jidla_ind[i]])
    }
    
    return jidla_jidelnicek

    //console.log( dist(V, W, n, m) );
}