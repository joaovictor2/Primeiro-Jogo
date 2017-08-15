#pragma strict
public class Player extends Personagem{}

var MCamera: Transform;
var Mx: boolean;
var My: boolean;

function Start () {
    Animador.SetBool("noChao", true);
    Animador.SetBool("seMovendo", false);
    Animador.SetBool("noAtaque", false);
}

function Update () {
    tSemAtaque += Time.deltaTime;

    if(Input.GetKeyDown(KeyCode.LeftShift) && tSemAtaque > 0.5)
        Animador.SetBool("noAtaque", true);

    if(!Animador.GetBool("noAtaque")) {
        Animador.SetBool("noChao", noChao());

        if(noChao()) {
            if(Input.GetKeyDown(KeyCode.UpArrow))
                Pulando();
        }
        Move(Input.GetAxis("Horizontal"), Input.GetAxis("Horizontal")*4.5);
    }
    else
        Ataque();

    MoveCamera();
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
