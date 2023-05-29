import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { PlusProgram } from "../target/types/plus_program";
import { Keypair, SystemProgram } from "@solana/web3.js";

describe("PlusProgram", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.PlusProgram as Program<PlusProgram>;

  const plusAccount = Keypair.generate()

  it("Is Adding!", async () => {
    // Add your test here.
    const tx = await program.methods.operation(new anchor.BN(3), new anchor.BN(4), { sub: {} }).accounts({
      signer: program.provider.publicKey,
      systemProgram: SystemProgram.programId,
      plusAccount: plusAccount.publicKey
    }).signers([plusAccount]).rpc();
    console.log("Your transaction signature", tx);
  });


  it("Fetch result!", async () => {
    // Add your test here.
    const result = await program.account.plusBank.fetch(plusAccount.publicKey);
    console.log("Result: ", result.result.toNumber());

  })
  // it("Is Adding!", async () => {
  //   // Add your test here.

  //   const tx = await program.methods.operation(new anchor.BN(3), new anchor.BN(4), { sub: {} }).accounts({
  //     plusAccount: plusAccount.publicKey
  //   }).rpc();
  //   console.log("Your transaction signature", tx);
  // });
});
