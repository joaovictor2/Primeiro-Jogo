#pragma strict

var Animador: Animator;
var rb2D: Rigidbody2D;
var Colisao: RaycastHit2D;
var CaixaColisao: BoxCollider2D;
var tAtaque: float;
var tSemAtaque: float;
var filhos: Transform[];
var ColisaoAr: boolean;

function Start () {

}

function Update () {
    
}

function Pulando() {
    Animador.SetBool("noChao", false);
    rb2D.AddForce(transform.up*550);
}

function noChao(): boolean {
    Colisao = Physics2D.Raycast(filhos[0].position, -transform.up, CaixaColisao.size.y/1.9);
    if (Colisao) {
        ColisaoAr = false;
        return(true);
    }
    else {
        Colisao = Physics2D.Raycast(filhos[1].position, -transform.up, CaixaColisao.size.y/1.9);
        if (Colisao)
            return(true);
        else
            return(false);
    }
}

function Move(direcao: float, velocidade: float) {
    if(!ColisaoAr) {
        if(direcao > 0)
            transform.rotation.eulerAngles.y = 0;
        if(direcao < 0)
            transform.rotation.eulerAngles.y = 180;

        rb2D.velocity.x = velocidade;

        if(Input.GetAxis("Horizontal") != 0)
            Animador.SetBool("seMovendo", true);
        else
            Animador.SetBool("seMovendo", false);
    }
}

function Ataque() {
    tAtaque += Time.deltaTime;

    if(tAtaque < 0.5) {
        rb2D.velocity.y = 0;
    }   
    else {
        Animador.SetBool("noAtaque", false);
        tAtaque = 0;
        tSemAtaque = 0;
    }
}

function OnCollisionStay2D(coll: Collision2D) {
    if(!Animador.GetBool("noChao"))
        ColisaoAr = true;
}

function OnCollisionExit2D(coll: Collision2D) {
    ColisaoAr = false;
}