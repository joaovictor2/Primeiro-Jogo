using UnityEngine;
using System.Collections;

public class Movimetacao : MonoBehaviour {
    // 1
    public float speed;
    public float jumpForce;
    private bool facingRight;
    private float movX;
    private Rigidbody2D rb;
    private new Transform transform;
    private float AbsVelY;
    private bool jumping;
    private Animator playerAnimator;

    // Use this for initialization
    void Start() {    

        rb = GetComponent<Rigidbody2D>();
        transform = GetComponent<Transform>();
        playerAnimator = GetComponent<Animator>();
        speed = 5f;
        jumpForce = 320f;
        facingRight = true;
        AbsVelY = 0f;
        jumping = false;

    }

    void FixedUpdate() {

        Move();
        Jump();
    }

    void Move() {

        movX = Input.GetAxis("Horizontal");
        rb.velocity = new Vector2(movX * speed, rb.velocity.y);

        if (movX > 0 && !facingRight) {
            Flip();
        }
        else
            if (movX < 0 && facingRight) {
                Flip();
            }

        if (movX != 0) {
            playerAnimator.SetBool("Andando", true);
        }
            else
                playerAnimator.SetBool("Andando", false);

    }

    void Flip() {

        facingRight = !facingRight;

        Vector3 scale = transform.localScale;
        scale.x *= -1;
        transform.localScale = scale;
    }

    void Jump() {

        AbsVelY = Mathf.Abs (rb.velocity.y);
        jumping = AbsVelY >= 0.5f;

        if (Input.GetKey ("up") && !jumping) {
            rb.AddForce(new Vector2(rb.velocity.x, jumpForce));
            playerAnimator.SetBool("Pulando", true);
        }
            else 
                if (!jumping) {
                    playerAnimator.SetBool("Pulando", false);
                }

    }

    void Murro() {

        if (Input.GetKey("left ctrl") && !jumping)
        {
            playerAnimator.SetBool("Murro", true);
        }
        else
                if (!jumping)
        {
            playerAnimator.SetBool("Murro", false);
        }

    }

    // Update is called once per frame
    void Update() {

    }

}