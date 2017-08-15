#pragma strict
var Personagem: Rigidbody2D;
var Velocidade: float;
var Animacao: Animator;
var VelocidadePulo: float;

var MCamera: Transform;
var Mx: boolean;
var My: boolean;

var Colisao: RaycastHit2D;
var CaixaColisao: BoxCollider2D;
var filhos: Transform[];
var ColisaoAr: boolean;

function Start () {
    Personagem = GetComponent(Rigidbody2D);
    Animacao = GetComponent(Animator);
    Velocidade = 4.5; 
    VelocidadePulo = 10;
}

function Update () {
    Personagem.velocity.x = Velocidade * Input.GetAxis("Horizontal");
    Animacao.SetFloat("Andando", Mathf.Abs(Input.GetAxis("Horizontal")));

    if(Input.GetAxis("Horizontal") != 0) {
        if(Input.GetAxis("Horizontal") > 0) {
            Personagem.transform.localScale.x = 1;
        }
        else {
            Personagem.transform.localScale.x = -1;
        }
    }

    if(noChao()) {
        if(Input.GetKeyDown(KeyCode.UpArrow))
            Pulando();
    }

    MoveCamera();
}

function Pulando() {
    Animacao.SetBool("Pulando", true);
    Personagem.AddForce(transform.up*550);
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

function MoveCamera() {
    var DisX: float = Mathf.Abs(transform.position.x - MCamera.position.x);

    if(!Mx && DisX > 2)
        Mx = true;

    if(Mx) {
        MCamera.position.x = Mathf.Lerp(MCamera.position.x, transform.position.x, Time.deltaTime*10);
        if(DisX < 0.1)
            Mx = false;
    }

    var DisY: float = Mathf.Abs(transform.position.y - MCamera.position.y);

    if(!My && DisY > 4)
        My = true;

    if(My) {
        MCamera.position.y = Mathf.Lerp(MCamera.position.y, transform.position.y, Time.deltaTime*10);
        if(DisY < 0.1)
            My = false;
    }
}