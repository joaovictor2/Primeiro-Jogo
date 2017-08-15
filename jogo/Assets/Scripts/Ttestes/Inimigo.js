#pragma strict
public class Inimigo extends Personagem{}

var Plataforma: Transform;
var pPlataforma: Transform[];
var indiceP: int;
var aPlayer: Transform;

function Start () {
    Animador.SetBool("noChao", true);
    Animador.SetBool("seMovendo", false);
    Animador.SetBool("noAtaque", false);

    aPlayer = GameObject.Find("Player").transform;
}

function Update () {
    tSemAtaque += Time.deltaTime;

    if(!Animador.GetBool("noAtaque")) {
        Animador.SetBool("noChao", noChao());
        if(noChao()) {
            VerificaPlataforma();
            if(!detectaPlayer()) {
                Patrulha();
            }
        }
    }
    else {
        Ataque();
    }
}

function VerificaPlataforma() {
    if(Colisao) {
        if(Plataforma != Colisao.transform){
            Plataforma = Colisao.transform;

            var i: int;

            pPlataforma = new Transform[Plataforma.childCount];

            for(i=0; i < pPlataforma.Length; i++) {
                pPlataforma[i] = Plataforma.GetChild(i);
            }
        }
    }
    else {
        Plataforma = null;
    }
}

function Patrulha() {
    if(Plataforma) {
        if(Mathf.Abs(pPlataforma[indiceP].position.x - transform.position.x) > 0.5) {            
            Move(retornaDirecao(pPlataforma[indiceP]), retornaDirecao(pPlataforma[indiceP]) * 3);
        }
        else {
            indiceP++;
            if(indiceP >= pPlataforma.Length) {
                indiceP = 0;
            }
        }
    }
}

function detectaPlayer(): boolean {
    if(Mathf.Abs(aPlayer.position.x - transform.position.x) < 7) {
        Move(retornaDirecao(aPlayer), retornaDirecao(aPlayer) * 3);

        if(Mathf.Abs(aPlayer.position.x - transform.position.x) < 5) {
            Animador.SetBool("noAtaque", true);
        }
        else {
            if(aPlayer.position.y - transform.position.y > 0) {
                Pulando();
            }
        }
        return (true);
    }
    return (false);
}

function retornaDirecao(quem: Transform): int {
    var Direcao: int;
    if(quem.position.x - transform.position.x < 0) {
        Direcao = -1;
    }
    else {
        Direcao = 1;
    }
    return (Direcao);
}